from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.utils import timezone
from datetime import datetime


class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=10, unique=True)
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return "{}".format(self.email)


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    position = models.CharField(max_length=30)
    dob = models.DateField()
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    department = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='uploads', blank=True, default='uploads/default.png')


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    body = models.CharField(default='', max_length=200)

    def __str__(self):
        return self.body

class News(models.Model):
    title = models.CharField(default='', max_length=255)
    body = models.TextField(default='', max_length=99999)
    image = models.ImageField(upload_to='uploads', blank=True, default='uploads/default.jpg')
    date = models.DateTimeField(
        auto_now_add=True
    )
    author = models.CharField(default='', max_length=255)

    def __str__(self):
        return self.body
