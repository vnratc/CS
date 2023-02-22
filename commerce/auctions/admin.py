from django.contrib import admin

from .models import Listing, Bid, Comment, User

class ListingAdmin(admin.ModelAdmin):
    list_display = ("title", "cat", "s_bid", "price", "active", "id")

class CommentAdmin(admin.ModelAdmin):
    list_display = ("listing_c", "comment", "id")

class BidAdmin(admin.ModelAdmin):
    list_display = ("listing_b", "bid", "id")

class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "id")

# Register your models here.
admin.site.register(Listing, ListingAdmin)
admin.site.register(Bid, BidAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(User, UserAdmin)