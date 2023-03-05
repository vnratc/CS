import time

from django import forms
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import User, Post

def posts(request):

    # Add conditions for "all posts", "profile page posts" and "following page posts" like for different mailboxes in p3

    # Get start and end points
    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 9))
    posts = Post.objects.all().order_by("-timestamp").all()

    # Generate list of posts
    data = []
    for i in range(start, end + 1):
        data.append(f"Post #{i}")

    # Artificially delay speed of response
    # time.sleep(1)

    # Return list of posts
    return JsonResponse([post.serialize() for post in posts], safe=False)
    # return JsonResponse({
    #     "posts": posts
    # })


# Remake everything using JsonResponse. def new func to return posts. Let index just show the home page.
# USE REACT TO CREATE HTML ELEMENTS
def index(request):
    posts = Post.objects.all().order_by("-timestamp").all()
    p = Paginator(posts, 10)
    # TRY JSON() OR TXT(). Solve new lines in body. The following didn't work
    # for post in posts:
    #     post.body = post.body.replace("\n", "<br>")
    # return JsonResponse([post.serialize() for post in posts], safe=False)
    

    return render(request, "network/index.html", {
        "new_post_form": NewPostForm,
        # "posts": posts,
        # "p": p
    })


def following(request):
    print(request.GET.urlencode())
    user = User.objects.get(pk=request.user.id)
    followed_users = user.following.all()
    posts = Post.objects.filter(user__in=followed_users)    # all posts made by users that the current user follows
    posts = posts.order_by("-timestamp").all()
    return render(request, "network/following.html", {
        "posts": posts
    })
    

class NewPostForm(forms.Form):
    body = forms.CharField(label="New Post", widget=forms.Textarea(attrs={'rows': 4, 'class': 'form-control mb-2', 'aria-label': 'New Post'}))


def new_post(request):
    if request.method == 'POST':
        form = NewPostForm(request.POST)
        if form.is_valid():
            body = form.cleaned_data["body"]
            post = Post(body=body, user=request.user)
            post.save()
            return HttpResponseRedirect(reverse("index"))
        else:
            return HttpResponse('Invalid Form')
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
    user_following = user.following.all()
    following = user_profile.following.all()
    followers = user_profile.followers.all()
    return render(request, "network/profile.html", {
        "user_profile": user_profile,
        "user_profile_posts": user_profile_posts,
        "user_following": user_following,
        "following": following,
        "followers": followers,
        "followers_count": followers_count,
        "following_count": following_count
    })


# add login requred decorator for all required functions 
def follow(request, user_id):
    if request.method == 'POST':
        user_profile = User.objects.get(pk=user_id)
        print(user_profile.id)
        user = User.objects.get(pk=request.user.id)
        print(user.id)
        user.following.add(user_profile)
        user_profile.followers.add(user)
        return HttpResponseRedirect(reverse("profile", args=(user_id,)))
    return HttpResponseRedirect(reverse("profile", args=(user_id,)))


def unfollow(request, user_id):
    if request.method == 'POST':
        user_profile = User.objects.get(pk=user_id)
        user = User.objects.get(pk=request.user.id)
        user.following.remove(user_profile)
        user_profile.followers.remove(user)
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
