from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    reservations = models.ManyToManyField('Reservation')
    

class Room(models.Model):
    reservation = models.ManyToManyField('Reservation', related_name='rooms', blank=True)
    title = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    bed_num = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.title}'


class Reservation(models.Model):
    checkin = models.DateField()
    checkout = models.DateField()
    room = models.ForeignKey('Room', on_delete=models.PROTECT, related_name='reservations')
    guest = models.ForeignKey('User', on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.guest}: {self.checkin} - {self.checkout} - {self.room}'

    