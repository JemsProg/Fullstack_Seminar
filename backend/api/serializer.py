from rest_framework import serializers
from .models import inventory

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = inventory
        fields = '__all__'
        