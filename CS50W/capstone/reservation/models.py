from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    reservations = models.ManyToManyField('Reservation')


class Reservation(models.Model):
    guest = models.ForeignKey('User', on_delete=models.PROTECT)
    room = models.ForeignKey('Room', on_delete=models.PROTECT)
    checkin = models.DateField()
    checkout = models.DateField()

    def __str__(self):
        return f'{self.guest} - {self.room} - {self.checkin} - {self.checkout}'
    

class Room(models.Model):
    reservations = models.ManyToManyField('Reservation', related_name='reserved_room', blank=True)
    title = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    bed_num = models.PositiveSmallIntegerField()
    # add pictures url field? file field? static folder?
    # add price per night

    def __str__(self):
        return f'{self.title}'

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'bed_num': self.bed_num
        }

    