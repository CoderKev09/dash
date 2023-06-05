from django.db import models

# Create your models here.
class Saleperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
