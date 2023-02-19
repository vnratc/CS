from django.contrib.auth.models import AbstractUser
from django.db import models


class Listing(models.Model):
    title = models.CharField(blank=True, null=True, max_length=64)
    description = models.CharField(blank=True, null=True, max_length=512)
    # starting_bid = models.DecimalField(blank=True, null=True, max_digits=8, decimal_places=2)
    # price = models.DecimalField(blank=True, null=True, max_digits=8, decimal_places=2)
    image_url = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=64, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    # active = models.BooleanField()

    def __str__(self):
        return f"{self.title}"

class Bid(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="bids")
    bid = models.DecimalField(max_digits=8, blank=True, decimal_places=2)

    def __str__(self):
        return f"{self.listing.title}, ${self.bid}"


class Comment(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments")
    comment = models.CharField(max_length=512)

    def __str__(self):
        return f"{self.listing.title}, {self.comment}"


class User(AbstractUser):
    created_listings = models.ForeignKey(Listing, on_delete=models.CASCADE, blank=True, null=True, related_name="creator")
    bids = models.ForeignKey(Bid, on_delete=models.CASCADE, blank=True, null=True, related_name="bidders")
    comments = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, null=True, related_name="commenters")
    watchlist = models.ManyToManyField(Listing, blank=True, related_name="watchlisted")

    def __str__(self):
        return f"{self.username}"