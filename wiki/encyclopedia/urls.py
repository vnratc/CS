from django.urls import path

from . import views

# if you decide to  add app_name here, then you have to refer to it in html: <a href="{% url 'encyclopedia:index' %}">Home</a>
# app_name = "encyclopedia"
urlpatterns = [
    path("", views.index, name="index"),
    path("<str:title>", views.display_contents, name="title"),
    path("search", views.search, name="search")
]
