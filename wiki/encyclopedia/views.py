from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from . import util

class SearchForm(forms.Form):
    query = forms.CharField()

def index(request):
    
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def display_contents(request, title):
    if not util.get_entry(title):   # if util.get_entry(title) == None:
        return render(request, 'encyclopedia/not_found.html')
    else:
        contents = util.get_entry(title)
        return render(request, "encyclopedia/contents.html", {
            "contents": contents,
            "title": title.capitalize()
        })

def search(request):
    
    return render(request)
