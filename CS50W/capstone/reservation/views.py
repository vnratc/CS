import calendar
import time
from calendar import HTMLCalendar
from datetime import datetime
from datetime import date
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import User

# Create your views here.

day = datetime.now().day
month = datetime.now().month
year = datetime.now().year


class ResForm(forms.Form):
    checkin = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    checkout = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))


def index(request):
    test_cal = calendar.Calendar()
    # print(test_cal.yeardatescalendar(year, width=3))
    cal = HTMLCalendar().formatmonth(year, month)     
    return render(request, 'reservation/index.html', {
        'cal': cal,
        'res_form': ResForm
    })

@login_required()
def reserve(request):
    checkin = request.POST['checkin']
    dt = datetime.strptime(checkin, '%Y-%m-%d')
    print(dt.date())
    # checkin_dt = checkin_dt.date()
    # checkin_dt
    return HttpResponseRedirect(reverse('index'))


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