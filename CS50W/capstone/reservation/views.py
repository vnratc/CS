from datetime import datetime
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.views.generic.list import ListView
from django.urls import reverse

from .models import * 

# Create your views here.
class SearchForm(forms.Form):
    checkin = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    checkout = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    room = forms.ModelChoiceField(queryset=Room.objects.all(), required=False, label='Room Preference')


def get_dates(request):
    form = SearchForm(request.POST)
    if form.is_valid():
        requested_checkin = form.cleaned_data['checkin']
        requested_checkout = form.cleaned_data['checkout']
        room = form.cleaned_data['room']
        # Check for valid input
        if requested_checkin >= requested_checkout:
            return HttpResponse('Invalid Checkin/Checkout dates.')
        return {'in':requested_checkin, 'out': requested_checkout, 'room': room}
    else: return HttpResponse('Form is invalid')


def index(request):
    rooms = Room.objects.all()
    if request.method == 'POST':
        dates = get_dates(request)
        if dates['room']: rooms = Room.objects.filter(pk=dates['room'].id)
        conflicting_res = Reservation.objects.filter(
            checkin__lt=dates['out'], checkout__gt=dates['in']
        )
        if conflicting_res:
            rooms = rooms.exclude(reservation__in=conflicting_res)
    return render(request, 'reservation/index.html', {
        'rooms': rooms,
        'search_form': SearchForm
    })


def room(request, room_id):
    room = Room.objects.get(pk=room_id)
    return render(request, 'reservation/room.html', {
        'room': room,
        'search_form': SearchForm
    })


@login_required()
def reserve(request, room_id):
    if request.method == 'POST':
        dates = get_dates(request)
        requested_room = Room.objects.get(pk=room_id)
        # Check requested period and room for availability
        for reservation in requested_room.reservations.all():
            if (dates['in'] >= reservation.checkin and dates['in'] < reservation.checkout or
                dates['out'] > reservation.checkin and dates['out'] <= reservation.checkout or
                dates['in'] < reservation.checkin and dates['out'] > reservation.checkout):
                return HttpResponse('These dates are not available')
            else: print('No dates conflict')
        # Create Reservation
        reservation = Reservation(guest=user, room=requested_room, checkin=dates['in'], checkout=dates['out'])
        reservation.save()
        requested_room.reservations.add(reservation)
        user = request.user
        user.reservations.add(reservation)     
    else: return HttpResponse('Method not allowed')
    return HttpResponseRedirect(reverse('index'))


@login_required()
def profile(request):
    reservations = Reservation.objects.filter(guest=request.user)
    return render(request, 'reservation/profile.html', {
        'reservations': reservations
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "reservation/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "reservation/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "reservation/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "reservation/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "reservation/register.html")