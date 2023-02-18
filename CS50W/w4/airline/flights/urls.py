from django.urls import path
from . import views

app_name = "flights"
urlpatterns = [
    path("", views.index, name="index"),
    # path("<test>", views.test, name="test"),
    path("<int:flight_id>", views.details, name="details"),
    path("<int:flight_id>/book", views.book, name="book")
]