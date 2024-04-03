from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class WeatherData(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    temperature = models.FloatField()
    description = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city.name} - {self.temperature}°C"
