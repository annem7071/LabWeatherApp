import requests
from django.shortcuts import render
from .models import City, WeatherData

# Create your views here.
def weather(request):
    if request.method == 'POST':
        city_name = request.POST['city']
    else:
        cities = City.objects.all()
        weather_data = WeatherData.objects.all()
        context = {'cities': cities, 'weather_data': weather_data}
        return render(request, 'weather/weather.html', context)