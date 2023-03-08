
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("new_post", views.new_post, name="new_post"),
    path("following", views.following, name="following"),
    path("edit_post/<int:post_id>", views.edit_post, name="edit_post"),
    path("save_edit/<int:post_id>", views.save_edit, name="save_edit"),
    path("like/<int:post_id>", views.like, name="like"),
    path("<int:user_id>", views.profile, name="profile"),
    path("<int:user_id>/fol_unfol", views.fol_unfol, name="fol_unfol")
]
