import json
from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import *
from .forms import SearchForm


def show_error(request, message):
    return render(request, 'reservation/error.html', {
        'message': message
    })


def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    return render(request, 'reservation/index.html', {
        'search_form': SearchForm
    })


@csrf_exempt
def search(request):
    # Extract and check data from search form
    if not request.GET['chin']: return JsonResponse({'message': 'Select Checkin date.'})
    else: req_chin = datetime.strptime(request.GET['chin'], '%Y-%m-%d').date()
    
    if not request.GET['chout']: return JsonResponse({'message': 'Select Checkout date.'})
    else: req_chout = datetime.strptime(request.GET['chout'], '%Y-%m-%d').date()
    
    if not request.GET['pers_num']: return JsonResponse({'message': 'Enter number of guests.'})
    else: pers_num: pers_num = int(request.GET['pers_num'])
    
    req_room = request.GET['req_room']
    if req_room: req_room = int(request.GET['req_room'])
    
    if req_chin >= req_chout:
        return JsonResponse({'message': 'Invalid Checkin/Checkout dates.'})
    
    # Query and filter db
    if req_room:
        rooms = Room.objects.filter(pk=req_room).exclude(bed_num__lt=pers_num)
    else:
        rooms = Room.objects.exclude(bed_num__lt=pers_num)
    conflicting_res = Reservation.objects.filter(
        checkin__lt=req_chout,
        checkout__gt=req_chin
    )
    if conflicting_res:
        rooms = rooms.exclude(reservation__in=conflicting_res)
    return JsonResponse([room.serialize() for room in rooms], safe=False)


def room(request, room_id):
    room = Room.objects.get(pk=room_id)
    return JsonResponse(room.serialize(), safe=False)


@csrf_exempt
@login_required()
def reserve(request, room_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Convert str to date objects
        chin = datetime.strptime(data['chin'], '%Y-%m-%d').date()
        chout = datetime.strptime(data['chout'], '%Y-%m-%d').date()
        # Check requested period and room for availability
        requested_room = Room.objects.get(pk=room_id)
        for reservation in requested_room.reservations.all():
            if (chin >= reservation.checkin and chin < reservation.checkout or
                chout > reservation.checkin and chout <= reservation.checkout or
                chin < reservation.checkin and chout > reservation.checkout):
                print('These dates are not available')
                return show_error(request, 'These dates are not available')
                return JsonResponse({'message': 'These dates are not available'})
            else: print('No dates conflict')
        # Create Reservation, add it to room and user
        user = request.user
        reservation = Reservation(guest=user, room=requested_room, checkin=chin, checkout=chout)
        reservation.save()
        requested_room.reservations.add(reservation)
        user.reservations.add(reservation)     
        return JsonResponse({'message': 'Reservation Successful'})
    else: return HttpResponseRedirect(reverse('index'))


@login_required()
def my_reservations(request):
    reservations = Reservation.objects.filter(guest=request.user)
    return JsonResponse([res.serialize() for res in reservations], safe=False)

@login_required()
def select_res(request, res_id):
    res = Reservation.objects.get(pk=res_id)
    return JsonResponse(res.serialize(), safe=False)

@csrf_exempt
@login_required()
def cancel_res(request, res_id):
    if request.method != 'POST':
        return HttpResponseRedirect(reverse('index'))
    data = json.loads(request.body)
    reservation = Reservation.objects.get(pk=data['id'])
    print(data)
    print(reservation)
    user = request.user
    print(user)
    room = Room.objects.get(pk=data['room_id'])
    print(room)
    user.reservations.remove(reservation)
    room.reservations.remove(reservation)
    reservation.delete()
    return JsonResponse('Reservation Canceled', safe=False)

# login, logout, register


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