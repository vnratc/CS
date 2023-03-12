from django import forms
from .models import Room
from datetime import datetime, timedelta

today_str = datetime.now().date().strftime('%Y-%m-%d')
day = timedelta(days=1)
tomorow_str = (datetime.now().date() + day).strftime('%Y-%m-%d')

class SearchForm(forms.Form):
    checkin = forms.DateField(initial=today_str, widget=forms.DateInput(attrs={
        'type': 'date',
        'id': 'checkin'
    }))
    
    checkout = forms.DateField(initial=tomorow_str, widget=forms.DateInput(attrs={
        'type': 'date',
        'id': 'checkout'
    }))
   
    pers_num = forms.IntegerField(initial=1 , widget=forms.NumberInput(attrs={
        'id': 'pers_num',
        'min': '1',
        'max': '10'
    }), label='Number of Persons')
    
    req_room = forms.ModelChoiceField(widget=forms.Select(attrs={
        'id': 'req_room'
    }), queryset=Room.objects.all(), required=False, label='Room Preference')