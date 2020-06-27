from django.db import models

# Create your models here.
class Comments(models.Model):
    name = models.TextField(max_length=15)
    email = models.EmailField(max_length=15)
    subject = models.TextField(max_length=30)
    comment = models.TextField(max_length=200)


    def __str__(self):
        return self.subject + '|' + str(self.name)


class Email_list(models.Model):
    name = models.TextField(max_length=30)
    email = models.EmailField(max_length=30)

    def __str__(self):
        return self.name