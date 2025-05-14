from django.db import models

class inventory(models.Model):
    productName = models.CharField(max_length=50)
    productQuantity = models.IntegerField()

    def __str__(self):
        return self.productName
    
    