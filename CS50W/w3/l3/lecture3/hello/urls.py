from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # this str is taken from requested URL (address bar) passed to greet function in views.py
    path("<str:name>", views.greet, name="greet"),
    path("vlad", views.vlad, name="vlad"),
        # url     function     name for reference
    path("david", views.david, name="david")
]