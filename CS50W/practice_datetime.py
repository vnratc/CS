from datetime import datetime, timedelta

# day = datetime.now().day
# month = datetime.now().month
# year = datetime.now().year

today = datetime.now().date()
delta = timedelta(days=1)
yesterday = today - delta
print(today > yesterday)