from django.db import models
from django.urls import reverse


class User(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    is_contacted = models.BooleanField()
    notes = models.TextField(blank=True, max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # class Meta:
    #     ordering = ['first_name', 'last_name']

    def get_absolute_path(self):
        return reverse('user_detail', args=[str[self.id]])

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
