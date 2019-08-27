# Generated by Django 2.2.3 on 2019-08-26 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20190729_1517'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='author',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='news',
            name='body',
            field=models.TextField(default='', max_length=99999),
        ),
        migrations.AlterField(
            model_name='news',
            name='image',
            field=models.ImageField(blank=True, default='uploads/default.jpg', upload_to='uploads'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='photo',
            field=models.ImageField(blank=True, default='uploads/default.png', upload_to='uploads'),
        ),
    ]
