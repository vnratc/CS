# Generated by Django 4.1.6 on 2023-03-14 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0012_alter_room_img_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='img_path',
            field=models.FilePathField(path='reservation/static/reservation'),
        ),
    ]
