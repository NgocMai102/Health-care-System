# Định tuyến URL chính của dự án
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), 
    path('api/', include('laboratory.urls')),
]