from django.shortcuts import render
from rest_framework import views, viewsets, status
from rest_framework.response import Response
from .models import User
from .serializer import UserSerializer
from environ import Env
import requests
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView as TRV
from .serializer import MyTokenObtainPairSerializer

from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password

env = Env()
Env.read_env()

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class WeatherAPI(views.APIView):
    api_key = env('WEATHER_API_KEY')
    Weather_API_URL = f'http://api.weatherapi.com/v1/current.json?key={api_key}&q=bulk'

    def post(self, request):
        # get locations from request body
        locations = request.data.get('locations')
        # if locations is not provided
        if not locations:
            return Response({'message': 'locations is required'}, status=status.HTTP_400_BAD_REQUEST)
        # get weather data for weather api
        req_body = []
        for location in locations:
            req_body.append({'q': location})
        req_body = {'locations': req_body}
        # get weather data from weather api
        response = requests.post(self.Weather_API_URL, json=req_body)
        response = response.json().get('bulk')
        weather_data = []
        for location in response:
            location = location.get('query')
            print(location)
            if location.get("location"):
                weather_data.append({
                    'location':  location.get('location', {}).get('name') + ', ' + location.get('location', {}).get('country'),
                    'temp_c': location.get('current').get('temp_c'),
                    'humidity': location.get('current').get('humidity'),
                    'condition': location.get('current').get('condition').get('text'),
                    'icon': location.get('current').get('condition').get('icon'),
                    'localtime' : location.get('location', {}).get('localtime')
                })
        return Response(weather_data, status=status.HTTP_200_OK)


class RegisterUser(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # get user data from request body
        user_data = request.data
        # checks
        if not user_data.get('email'):
            return Response({'message': 'email is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_data.get('password'):
            return Response({'message': 'password is required'}, status=status.HTTP_400_BAD_REQUEST)
        # create
        user = User.objects.create(
            email=user_data.get('email'),
            password=user_data.get('password'),
            location=user_data.get('location')
        )
        user.save()
        # hash password
        user.set_password(user.password)
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    

class TokenRefreshView(TRV):
    serializer_class = MyTokenObtainPairSerializer


class SigninView(views.APIView):
    authentication_classes = []  # Set authentication classes to an empty list
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = get_object_or_404(User, email=email)
        except User.DoesNotExist:
            return Response({"errors": ["User not found"]}, status=status.HTTP_404_NOT_FOUND)

        if check_password(password, user.password):
            if not user.is_active:
                return Response({"errors": ["User is not active"]}, status=status.HTTP_400_BAD_REQUEST)

            serializer = MyTokenObtainPairSerializer()
            tokens = serializer.get_token(user)
            user = UserSerializer(user).data
            data = {
                'token': {
                    'access': str(tokens.access_token),
                    'refresh': str(tokens),
                },
                'user': user
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"errors": ["Invalid password"]}, status=status.HTTP_401_UNAUTHORIZED)
