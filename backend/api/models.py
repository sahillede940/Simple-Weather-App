from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = models.Manager()


    def __str__(self):
        return self.first_name
    
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"