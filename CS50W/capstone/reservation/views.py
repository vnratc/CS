import json
from datetime import datetime, timedelta
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
    all_rooms = Room.objects.all()
    return render(request, 'reservation/index.html', {
        'search_form': SearchForm,
        'all_rooms': all_rooms
    })

def change_date(request):
    btn = request.GET['btn']
    form_chin = datetime.strptime(request.GET['chin'], '%Y-%m-%d').date()
    form_chout = datetime.strptime(request.GET['chout'], '%Y-%m-%d').date()
    duration = (form_chout - form_chin).days
    day = timedelta(days=1)
    if btn == 'chin-': new_date = (form_chin - day).strftime('%Y-%m-%d')
    elif btn == 'chin': new_date = (form_chin + day).strftime('%Y-%m-%d')
    elif btn == 'chout-': new_date = (form_chout - day).strftime('%Y-%m-%d')
    elif btn == 'chout': new_date = (form_chout + day).strftime('%Y-%m-%d')
    return JsonResponse({'new_date': new_date, 'duration': duration}, safe=False)


@csrf_exempt
def search(request):
    # Extract and check data from search form
    if not request.GET['chin']: return JsonResponse({'message': 'Select Checkin date.'})
    else: req_chin = datetime.strptime(request.GET['chin'], '%Y-%m-%d').date()
    if req_chin < datetime.now().date(): return JsonResponse({'message': 'Checkin can not be in the past'})
    if not request.GET['chout']: return JsonResponse({'message': 'Select Checkout date.'})
    else: req_chout = datetime.strptime(request.GET['chout'], '%Y-%m-%d').date()
    # Get duration
    duration = req_chout.day - req_chin.day
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

    rooms_list = []
    for room in rooms:
        room = room.serialize()
        room.update({'duration': duration})
        rooms_list.append(room)
    return JsonResponse(rooms_list, safe=False)


def room(request, room_id):
    room = Room.objects.get(pk=room_id)
    req_chin = datetime.strptime(request.GET['chin'], '%Y-%m-%d').date() 
    req_chout = datetime.strptime(request.GET['chout'], '%Y-%m-%d').date()
    duration = req_chout.day - req_chin.day
    room = room.serialize()
    room.update({'duration': duration})
    return JsonResponse(room, safe=False)


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
        duration = chout.day - chin.day
        total = round(requested_room.price * duration, 2)
        user = request.user
        reservation = Reservation(guest=user, room=requested_room, checkin=chin, 
                                  checkout=chout, duration=duration, total=total)
        reservation.save()
        requested_room.reservations.add(reservation)
        user.reservations.add(reservation)     
        return JsonResponse({'message': 'Reservation Successful'})
    else: return HttpResponseRedirect(reverse('index'))


# def all_rooms():
#     all_rooms = Room.objects.all()
#     return JsonResponse(all_rooms, safe=False)


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
    user = request.user
    room = Room.objects.get(pk=data['room_id'])
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