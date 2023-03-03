from django import forms
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Post


def index(request):
    posts = Post.objects.all().order_by("-timestamp").all()

    # Solve new lines in body. The following didn't work
    # for post in posts:
    #     post.body = post.body.replace("\n", "<br>")

    return render(request, "network/index.html", {
        "new_post_form": NewPostForm,
        "posts": posts
    })


class NewPostForm(forms.Form):
    body = forms.CharField(label="New Post", widget=forms.Textarea(attrs={'class': 'form-control mb-2', 'aria-label': 'New Post'}))


def new_post(request):
    if request.method == 'POST':
        print(request.POST)
        form = NewPostForm(request.POST)
        if form.is_valid():
            body = form.cleaned_data["body"]
            post = Post(body=body, user=request.user)
            post.save()
            return HttpResponseRedirect(reverse("index"))
    else:
        return HttpResponseRedirect(reverse("index"))
    

def profile(request, user_id):
    # Get data about viewed user
    user_profile = User.objects.get(pk=user_id)
    # user_posts is a related name inside Post class
    user_profile_posts = user_profile.user_posts.all().order_by("-timestamp").all()
    followers_count = user_profile.followers.count()
    following_count = user_profile.following.count()
    # Get data about logged in user
    user = User.objects.get(pk=request.user.id)
    # followers = user.followers.all()
    following = user.following.all()
    return render(request, "network/profile.html", {
        "user_profile": user_profile,
        "user_profile_posts": user_profile_posts,
        # "followers": followers,
        "following": following,
        "followers_count": followers_count,
        "following_count": following_count
    })


# add login requred decorator for all required functions 
def follow(request, user_id):
    if request.method == 'POST':
        user_follow = User.objects.get(pk=user_id)
        user = User.objects.get(pk=request.user.id)
        user.following.add(user_follow)
        return HttpResponseRedirect(reverse("profile", args=(user_id,)))
    return HttpResponseRedirect(reverse("profile", args=(user_id,)))


def unfollow(request, user_id):
    if request.method == 'POST':
        user_unfollow = User.objects.get(pk=user_id)
        user = User.objects.get(pk=request.user.id)
        user.following.remove(user_unfollow)
        return HttpResponseRedirect(reverse("profile", args=(user_id,)))
    return HttpResponseRedirect(reverse("profile", args=(user_id,)))



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
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


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
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
