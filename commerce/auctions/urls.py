from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("new", views.new, name="new"),
    path("show_error", views.show_error, name="show_error"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("closed_listings", views.closed_listings, name="closed_listings"),
    path("categories", views.categories, name="categories"),
    path("<int:listing_id>", views.listing, name="listing"),
    path("<int:listing_id>/add_to_watchlist", views.add_to_watchlist, name="add_to_watchlist"),
    path("<int:listing_id>/remove_from_watchlist", views.remove_from_watchlist, name="remove_from_watchlist"),
    path("<int:listing_id>/place_bid", views.place_bid, name="place_bid"),
    path("<int:listing_id>/close", views.close, name="close"),
    path("<int:listing_id>/add_comment", views.add_comment, name="add_comment"),
    path("categories/<str:category>", views.active_in_cat, name="active_in_cat")
]
