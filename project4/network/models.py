from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField("User", blank=True, related_name="fg")   # "self" din't work here, follow actions somehow duplicated to both following and followers
    followers = models.ManyToManyField("User", blank=True, related_name="fs")


class Post(models.Model):
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="user_posts", null=True)
    likes = models.IntegerField(default=0)

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "timestamp":self.timestamp.strftime("%b %d %Y, %I:%M %p"),  # %b month abriged, %B month full, %p is for AM/PM, %I for hours
            "user": self.user,
            "likes": self.likes
        }
