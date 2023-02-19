from django.contrib.auth.models import AbstractUser
from django.db import models


class Listing(models.Model):
    title = models.CharField(max_length=64)
    descr = models.TextField()
    s_bid = models.IntegerField()
    url = models.URLField()
    cat = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.title}"
    

class Bid(models.Model):
    bid = models.IntegerField()
    listing_b = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="bids")

    def __str__(self):
        return f"{self.bid}"
    
class Comment(models.Model):
    comment = models.TextField()
    listing_c = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments")

    
class User(AbstractUser):
    pass