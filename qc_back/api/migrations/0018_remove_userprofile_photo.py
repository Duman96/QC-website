# Generated by Django 2.2.3 on 2019-08-28 14:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_userprofile_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='photo',
        ),
    ]