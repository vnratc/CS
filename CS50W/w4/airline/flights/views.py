from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import Flight, Passenger

# Create your views here.
@login_required()
def index(request):
    return render(request, "flights/index.html", {
        "flights": Flight.objects.all()
    })


@login_required()
def details(request, flight_id):
    try:
        flight = Flight.objects.get(id=flight_id)    # Also could use get.pk=flight_id   # where pk stands for "primary key"
        return render(request, "flights/details.html", {
        "flight": flight,
        "passengers": flight.passengers.all(),   # because related_name of Passenger.flights is "passengers".
        "non_passengers": Passenger.objects.exclude(flights=flight).all()
    })
    except Flight.DoesNotExist:
        return HttpResponse('Invalid URL')


@login_required()
def book(request, flight_id):
    if request.method == "POST":
        flight = Flight.objects.get(pk=flight_id)
        # Accessing Passenger class(table), get object with PRIMARY KEY that was posted with a form with input name "passenger"
        passenger = Passenger.objects.get(pk=int(request.POST["passenger"]))
        passenger.flights.add(flight)
        # reverse takes the name from urls.py, that corresponds to a particular view(function) and whatever arguments that it requires
        return HttpResponseRedirect(reverse("details", args=(flight.id,)))
        
