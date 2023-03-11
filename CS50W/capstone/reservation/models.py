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
    
    def serialize(self):
        return {
            'id': self.id,
            'room_title': self.room.title,
            'room_description': self.room.description,
            'room_bed_num': self.room.bed_num,
            'checkin': self.checkin,
            'checkout': self.checkout
        }
    

class Room(models.Model):
    reservations = models.ManyToManyField('Reservation', related_name='reserved_room', blank=True)
    title = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    bed_num = models.PositiveSmallIntegerField()
    # add price per night
    # add pictures url field? file field? static folder?

    def __str__(self):
        return f'{self.title}'

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'bed_num': self.bed_num
        }

    