# 🐍 Python Guide

Before running this project, make sure you have **Python** and **pip** installed on your computer.


### How to Check if Python and pip Are Installed

Open your terminal or command prompt and run:

```bash
python --version
pip --version
```

If you see version numbers, you're good to go.
If not, download Python from https://www.python.org/downloads and make sure to check "Add Python to PATH" during installation.

---
## Django + Django REST Framework Setup Guide

This guide walks you through installing Django, setting up a project, creating an app, defining a model, and building a serializer

---

### Step 1: Install Django and Django REST Framework

Run the following command:

```bash
pip install django djangorestframework
```

### Step 2: Create a Django Project

Inside your project folder, run:

```bash
django-admin startproject backend .
```
### Step 3: Create a Django App

Create a new app inside your project:

```bash
python manage.py startapp api
```

### Step 4: Configure settings.py

1. Open your backend/settings.py file.
2. Find the INSTALLED_APPS section.
3. Add the following:

```python
INSTALLED_APPS = [
    ...
    'api',
    'rest_framework',
]
```

### Step 5: Create a Model in api/models.py

Inside the api app, open models.py and define your model:

```python
from django.db import models

class Inventory(models.Model):
    productName = models.CharField(max_length=50)
    productQuantity = models.IntegerField()

    def __str__(self):
        return self.productName
```


### Step 6: Create a Serializer

Create a new file inside the api app named serializer.py, then add the following code:

```python
from rest_framework import serializers
from .models import Inventory

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
```

### 🧾 Step 7: Create a View for Your API

Now go to `api/views.py` and import the necessary modules:

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Inventory
from .serializer import InventorySerializer
```

#### Create a GET Function to Fetch Products

Still in views.py, add this function to retrieve all inventory products:

```python
@api_view(['GET'])
def get_product(request):
    product = Inventory.objects.all()
    serializeData = InventorySerializer(product, many=True).data
    return Response(serializeData)
```

### Step 8: Configure URLs in the API App

Inside your api folder, create a new file named urls.py
Then add the following code:

```python
from django.urls import path
from .views import get_product

urlpatterns = [
    path('product/', get_product, name='get_product'),
]
```

### Step 9: Register the App URLs in Project Configuration

Now go back to your project folder (where settings.py and urls.py are).
Open backend/urls.py and update the urlpatterns to include your API routes:

```python
from django.urls import path, include

urlpatterns = [
    path('api/', include('api.urls')),
]
```

#### Run the Server

Now start the Django development server by running this command in your terminal:

```bash
python manage.py runserver
```

#### Your API endpoint is now live at:

```bash
http://localhost:8000/api/product/
```

### Step 10: Create a POST Function to Insert Data

Now let’s create a view to insert or create inventory data.

Open your `api/views.py` file and add the following function:

```python
@api_view(['POST'])
def insert_product(request):
    data = request.data
    serializer = InventorySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

### Step 11: Add the POST Route to api/urls.py

Now update your api/urls.py to include the new view function:

```python
from django.urls import path
from .views import get_product, insert_product

urlpatterns = [
    path('product/', get_product, name='get_product'),
    path('product/insert/', insert_product, name='insert_product'),
]
```
### Step 12: Create Update and Delete Functionality

Let’s now add functionality to update and delete a product using its primary key (`pk`).

Open your `api/views.py` file and add the following function:

```python
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

```

### Step 13: Register the Route in api/urls.py

Update your `api/urls.py` to include the new route:

```python
from .views import get_product, insert_product, product_detail

urlpatterns = [
    path('product/', get_product, name='get_product'),
    path('product/insert/', insert_product, name='insert_product'),
    path('product/<int:pk>/', product_detail, name='product_detail'),
]
```
---
---

# Enable CORS to Connect Django with Frontend (React)

To allow your frontend (React) to communicate with your Django backend (API), you need to enable CORS (Cross-Origin Resource Sharing).

---

### Step 1: Install CORS Headers Package

Run the following in your terminal:

```bash
pip install django-cors-headers
```

### Step 2: Configure Django Settings

Open your project’s settings.py file and make the following changes:
1. Add to INSTALLED_APPS:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]
```

2. Add to MIDDLEWARE (at the top, ideally after security middleware):
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]
```

3. Allow All Origins (for development only):
```python
CORS_ALLOW_ALL_ORIGINS = True
```

For production, you should specify allowed origins using:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://your-frontend-domain.com"
]
```






# ✅ You can now:

- GET all products: http://localhost:8000/api/product/
- POST new product: http://localhost:8000/api/product/insert/
- PUT update product: http://localhost:8000/api/product/<id>/
- DELETE product: http://localhost:8000/api/product/<id>/








