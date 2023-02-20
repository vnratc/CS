from django import forms
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, Http404, HttpResponseBadRequest
from django.shortcuts import render
from django.urls import reverse

from .models import User, Listing, Bid, Comment


def index(request):
    return render(request, "auctions/index.html", {
        "listings": Listing.objects.all()
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


class LForm(forms.Form):
    title = forms.CharField(label="Title")
    descr = forms.CharField(label="Description", widget=forms.Textarea)
    s_bid = forms.IntegerField(label="Starting Bid")
    url = forms.URLField(label="URL for an image", required=False)
    cat = forms.CharField(label="Category", required=False)

def new(request):
    if request.method == "POST":
        form = LForm(request.POST)
        if form.is_valid():
            t = form.cleaned_data["title"]
            d = form.cleaned_data["descr"]
            s_b = form.cleaned_data["s_bid"]
            u = form.cleaned_data["url"]
            c = form.cleaned_data["cat"]
            # Later add change to created_listing field of User model
            Listing(title=t, descr=d, s_bid=s_b, url=u, cat=c, price=s_b).save()
            # Later change redirect to this new Listing Page
            return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/new.html", {
            "form": LForm
    })


def listing(request, listing_id):
    try:
        listing = Listing.objects.get(id=listing_id)
    except Listing.DoesNotExist:
        raise Http404("Listing Not Found")
    watchlist = User.objects.get(pk=request.user.id).watchlist.all()
    
    
    return render(request, "auctions/listing.html", {
        "listing": listing,
        "watchlist": watchlist
        # Add list of watchlisted listings or check if this listing is in the watchlist of current user. This is to display "Add" OR "Remove" from watchlist on "listing" page.
    })


def add_to_watchlist(request, listing_id):
    if request.method == "POST":
        try:
            listing = Listing.objects.get(pk=listing_id)
            user = User.objects.get(pk=request.user.id)
        # except KeyError:
        #     return HttpResponseBadRequest("Bad Request: no lisitng chosen")
        except Listing.DoesNotExist:
            return HttpResponseBadRequest("Bad Request: listing does not exist")
        except User.DoesNotExist:
            return HttpResponseBadRequest("Bad Request: user does not exist")
        user.watchlist.add(listing)
        return HttpResponseRedirect(reverse("listing", args=(listing_id,)))

def delete_from_watchlist(request, listing_id):
    if request.method == "POST":
        try:
            listing = Listing.objects.get(pk=listing_id)
            user = User.objects.get(pk=request.user.id)
        # except KeyError:
            # return HttpResponseBadRequest("Bad Request: no lisitng chosen")
        except Listing.DoesNotExist:
            return HttpResponseBadRequest("Bad Request: listing does not exist")
        except User.DoesNotExist:
            return HttpResponseBadRequest("Bad Request: user does not exist")
        user.watchlist.remove(listing)
        return HttpResponseRedirect(reverse("listing", args=(listing_id,)))
