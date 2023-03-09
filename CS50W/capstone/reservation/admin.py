from django.contrib import admin
from .models import User, Room, Reservation


class RoomAdmin(admin.ModelAdmin):
    list_display = ('title', 'bed_num')


# class ReservationAdmin(admin.ModelAdmin):
#     list_display = ('')


# Register your models here.
admin.site.register(User)
admin.site.register(Room, RoomAdmin)
admin.site.register(Reservation)
