# Generated by Django 4.1.6 on 2023-03-09 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0002_reservation_room_reservation_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='reservation',
            field=models.ManyToManyField(blank=True, related_name='rooms', to='reservation.reservation'),
        ),
    ]
