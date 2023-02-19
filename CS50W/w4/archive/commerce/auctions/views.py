from django import forms
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Listing, Bid, Comment


def index(request):
    return render(request, "auctions/index.html")


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

class ListingForm(forms.Form):
    title = forms.CharField(label="Title", widget=forms.TextInput(attrs={'class': 'form-control', 'aria-label': 'Title', 'placeholder': 'Title'}))
    description = forms.CharField(label="Description", widget=forms.Textarea(attrs={'class': 'form-control', 'aria-label': 'Description'}))
    # starting_bid = forms.DecimalField(label="Starting Bid", widget=forms.NumberInput, localize=False, max_digits=8, decimal_places=2, min_value=0.01)
    image_url = forms.URLField(label="Image URL", widget=forms.URLInput(attrs={'class': 'form-control', 'aria-label': 'URL'}), required=False)
    category = forms.CharField(label="Category", widget=forms.TextInput(attrs={'class': 'form-control', 'aria-label': 'Category'}), required=False)
    # active = forms.BooleanField(widget=forms.CheckboxInput)

@login_required()
def create_listing(request):
    if request.method == "POST":
        form = ListingForm(request.POST)
        if form.is_valid():
            t = form.cleaned_data["title"]
            d = form.cleaned_data["description"]
            # s_b = form.cleaned_data["starting_bid"]
            i_u = form.cleaned_data["image_url"]
            c = form.cleaned_data["category"]
            new_listing = Listing(title=t, description=d, image_url=i_u, category=c)
            new_listing.save()
            return HttpResponse(new_listing)
        #     return HttpResponseRedirect(reverse('index'))
        # else:
        #     return HttpResponse("form invalid")
    else:
        return render(request, "auctions/create_listing.html", {
            "listing_form": ListingForm
        })