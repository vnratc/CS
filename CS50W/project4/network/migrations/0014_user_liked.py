# Generated by Django 4.1.6 on 2023-03-06 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0013_alter_user_followers_alter_user_following'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='liked',
            field=models.ManyToManyField(blank=True, related_name='liked_by', to='network.post'),
        ),
    ]
