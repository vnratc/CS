from django.db import models

# Create your models here.
class Airport(models.Model):
    code = models.CharField(max_length=3)
    city = models.CharField(max_length=64)
    
    def __str__(self):
        return f"{self.city} ({self.code})"

class Flight(models.Model):
    #                          Airport here relates to the class(table) "Airport" for which "origin" is the FOREIGN KEY
    origin = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="departures")
    destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="arrivals")
    duration = models.IntegerField()

    def __str__(self):
        return f"{self.id}: {self.origin} to {self.destination}"

class Passenger(models.Model):
    first = models.CharField(max_length=64)
    last = models.CharField(max_length=64)
    #                                Flight here relates to the class(table) "Flight" for which "flights" is the FOREIGN KEY
    flights = models.ManyToManyField(Flight, blank=True, related_name="passengers")
    # It'like related_name kinda gives additional atribute "passengers" to the "Flight" class
    #... on which methods all() or get() can be applied:
    # Flight.objects.get(id=flight_id).passengers.all()

    # this is how string  will look like in HTML if I just plug the {{ variable }}
    def __str__(self):
        return f"{self.first} {self.last}"
