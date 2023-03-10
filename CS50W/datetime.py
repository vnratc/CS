import calendar
import time
from calendar import HTMLCalendar
from datetime import date

import datetime

# day = datetime.now().day
# month = datetime.now().month
# year = datetime.now().year

today = datetime.datetime.now().date()
delta = datetime.timedelta(days=1)
yesterday = today - delta
print(today > yesterday)