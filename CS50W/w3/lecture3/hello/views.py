from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    # return html instead of strings, text
    return render(request, "hello/index.html")   

def vlad(request):
    return HttpResponse("Hello, Vlad")

def david(request):
    return HttpResponse("Hello, David!")

# def greet(request, name):
#     return HttpResponse(f"Hello, {name.capitalize()}!")

def greet(request, name):
    return render(request, "hello/greet.html", {
        "name": name.capitalize()
    })