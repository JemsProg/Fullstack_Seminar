from django.urls import path
from .views import get_product, insert_product, product_detail

urlpatterns = [
    path('product/', get_product, name='get_product'),
    path('product/insert', insert_product, name='insert_product'),
    path('product/<int:pk>', product_detail, name='product_detail'),


]
