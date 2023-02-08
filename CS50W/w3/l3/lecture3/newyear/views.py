import datetime

from django.shortcuts import render

# Create your views here.
def index(request):
    now = datetime.datetime.now()
    return render(request, "newyear/index.html", {
       # newyear below is the variable that is passed to index.html and used there in "if statement"
        # "newyear": True # for testing
        "newyear": now.month == 1 and now.day == 1
    })