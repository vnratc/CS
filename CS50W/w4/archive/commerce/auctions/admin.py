from django.contrib import admin
from .models import Listing, Bid, Comment, User

# Register your models here.

class ListingAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "category", "date_created")

class UserAdmin(admin.ModelAdmin):
    filter_horizontal = ("watchlist",)


admin.site.register(Listing, ListingAdmin)
admin.site.register(Bid)
admin.site.register(Comment)
admin.site.register(User, UserAdmin)