from django import forms
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse

from . import util

class SearchForm(forms.Form):
#     # Use widget=forms.TextInput(attrs={}) to give atributes to the <form> html element
    q = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder':'Search Encyclopedia', 'class':'search'}))
    
entries = util.list_entries()

def index(request):
    
    return render(request, "encyclopedia/index.html", {
        "entries": entries,
        "form": SearchForm
    })

def display_contents(request, title):
    if util.get_entry(title):   # if util.get_entry(title) != None:
        for t in entries:
            if t.lower() == title: title = t
        contents = util.get_entry(title)
        return render(request, "encyclopedia/contents.html", {
            "contents": contents,
            "form": SearchForm,
            "title": title
        })
    else:
        return render(request, 'encyclopedia/not_found.html', {
            "form": SearchForm,
        })

def search(request):
    if request.method == "POST":
        # Take in data from the submitted form
        form = SearchForm(request.POST)
        if form.is_valid():
            # Isolate value of form input named "q" from the 'cleaned' version of form data
            q = form.cleaned_data["q"]
            # Get all entries and convert to lowercase
            # entries = [i for i in util.list_entries()]
            entries_l = [j.lower() for j in entries]
            if q.lower() in entries_l:
                return display_contents(request, q)
            else:
                matches = [k for k in entries_l if q.lower() in k]
                return render(request, "encyclopedia/search_results.html", {
                    "matches": matches,
                    "form": SearchForm
                })

class NewPage(forms.Form):
    page_title = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'aria-label': 'Title'}))
    page_content = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'aria-label': 'Markdown Content'}))

def new_page(request):
    return render(request, "encyclopedia/new_page.html", {
        "new_page_form": NewPage
    })