from django.db import models
from django.utils import timezone
from custom_auth.models import User

class Board(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class List(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} - {self.board}"
    

class Card(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateTimeField(null=True, blank=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    

class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} - {self.board}"