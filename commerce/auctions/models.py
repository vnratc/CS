from django.contrib.auth.models import AbstractUser
from django.db import models


class Listing(models.Model):
    title = models.CharField(max_length=64)
    descr = models.TextField()
    s_bid = models.IntegerField()
    url = models.URLField()
    cat = models.CharField(max_length=64)
    price = models.IntegerField(default=0)
    active = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.title}"
    
class Bid(models.Model):
    bid = models.IntegerField()
    listing_b = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="bids", null=True)

    def __str__(self):
        return f"{self.bid}, {self.listing_b}"
    
class Comment(models.Model):
    comment = models.TextField()
    listing_c = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments", null=True)

    def __str__(self):
        return f"{self.comment}"
    
class User(AbstractUser):
    created_listings = models.ManyToManyField(Listing, related_name="creators", blank=True)
    bids = models.ManyToManyField(Bid, related_name="bidders", blank=True)
    comments = models.ManyToManyField(Comment, related_name="commenters", blank=True)
    watchlist = models.ManyToManyField(Listing, related_name="watchlisted", blank=True)
    won_listings = models.ManyToManyField(Listing, related_name="winners", blank=True)

    def __str__(self):
        return f"{self.username}"
    
