from django.contrib.auth.models import AbstractUser
from django.db import models


class Listing(models.Model):
    title = models.CharField(max_length=64)
    descr = models.TextField()
    s_bid = models.IntegerField()
    url = models.URLField()
    cat = models.CharField(max_length=64)
    price = models.IntegerField()


    def __str__(self):
        return f"{self.title}"
    
# It looks like null=True is required for fields with ForeignKey
class Bid(models.Model):
    bid = models.IntegerField()
    listing_b = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="bids", null=True)

    def __str__(self):
        return f"{self.bid}"
    
class Comment(models.Model):
    comment = models.TextField()
    listing_c = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments", null=True)

    def __str__(self):
        return f"{self.comment}"
    
class User(AbstractUser):
    created_listings = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="creators", null=True)
    bids = models.ForeignKey(Bid, on_delete=models.CASCADE, related_name="bidders", null=True)
    comments = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="commenters", null=True)
    watchlist = models.ManyToManyField(Listing, related_name="watchlisted", blank=True)

    def __str__(self):
        return f"{self.username}, watchlisted: {self.watchlist}"
    
# class Watchlist(models.Model):
#     user = models.ManyToManyField(User, blank=True, related_name="watchers")
#     listing_w = models.ManyToManyField(Listing, blank=True, related_name="watched")
#     boolean = models.BooleanField(default=False)

#     def __str__(self):
#         return f"{self.user}: {self.listing_w}"