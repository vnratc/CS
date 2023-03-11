from django import forms
from .models import Room

class SearchForm(forms.Form):
    checkin = forms.DateField(widget=forms.DateInput(attrs={
        'type': 'date',
        'id': 'checkin'
    }))
    
    checkout = forms.DateField(widget=forms.DateInput(attrs={
        'type': 'date',
        'id': 'checkout'
    }))
   
    pers_num = forms.IntegerField(widget=forms.NumberInput(attrs={
        'id': 'pers_num',
        'min': '1',
        'max': '10'
    }), label='Number of Persons')
    
    req_room = forms.ModelChoiceField(widget=forms.Select(attrs={
        'id': 'req_room'
    }), queryset=Room.objects.all(), required=False, label='Room Preference')