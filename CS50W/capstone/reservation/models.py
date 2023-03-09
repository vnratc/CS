from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    pass


# class Schedule(models.Model):
#     avail
#     unavail
    


# class Hotel(models.Model):
#     name
#     rooms
    


# class Room(models.Model):
#     hotel
#     schedule
#     facilities


# class Reservation(models.Model):
#     room
#     guest
#     dates
    