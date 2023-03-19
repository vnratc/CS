from datetime import datetime, timedelta
import pytz

# day = datetime.now().day
# month = datetime.now().month
# year = datetime.now().year

print(pytz.common_timezones)
today = datetime.now().date()
delta = timedelta(days=1)
yesterday = today - delta
print(today > yesterday)