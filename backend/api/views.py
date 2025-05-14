from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from .models import inventory
from .serializer import InventorySerializer

@api_view(['GET'])
def get_product(request):
    product = inventory.objects.all()
    serializeData = InventorySerializer(product, many=True).data
    return Response(serializeData) 

@api_view(['POST'])
def insert_product(request):
    data = request.data
    serializer = InventorySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def product_detail(request, pk):
    try:
        product = inventory.objects.get(pk=pk)
    except inventory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE': 
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
            data = request.data
            serializer = InventorySerializer(product, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
