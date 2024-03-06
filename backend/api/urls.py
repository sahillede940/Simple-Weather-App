from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('weather/', views.WeatherAPI.as_view(), name='weather'),
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('signin/', views.SigninView.as_view(), name='signin'),
]
