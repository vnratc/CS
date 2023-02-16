from django.contrib import admin
from .models import Flight, Airport, Passenger

# Register your models here.
class FlightAdmin(admin.ModelAdmin):
    list_display = ("id", "origin", "destination", "duration")

class PassengerAdmin(admin.ModelAdmin):
    filter_horizontal = ("flights",) # need coma here because "The value of 'filter_horizontal' must be a list or tuple". So i guess there must be more than 1 arguments in parenthesis.

admin.site.register(Airport)
admin.site.register(Flight, FlightAdmin)
admin.site.register(Passenger, PassengerAdmin)