document.addEventListener('DOMContentLoaded', function() {
    const cities = ['Guildford', 'Berlin'];
    // have some preloaded weather data on selected cities and will fetch its weather data
    function loadedWeatherData(){
        cities.forEach(cityName => {
            fetchWeather(cityName);
        });

    }

    // function to get weather data from api
    function fetchWeather(cityName) {
        const apiKey = 'Y5N249W6J9DNGTE4MXC3SSFPR';
        const webapi = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${apiKey}&contentType=json`;
  

        fetch(webapi)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data: ', data);
                // calls displayWeather function if area entered exists in database
                displayWeather(data, cityName); 
                alert('City added successfully');

                const weatherDescription = data.days[0].conditions;
                const temperature = data.days[0].temp;
                const marqueeElement = document.getElementById('marquee');
                marqueeElement.textContent = `${cityName}: ${temperature}°C, ${weatherDescription}`; 

                
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }


    /*function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
        }, 3000); 
    } */

    // Function to display weather data on the web page
    function displayWeather(data, cityName) {
        const temperature = data.days[0].temp;
        const description = data.days[0].conditions;
    
        const weatherBox = document.createElement('div');
        weatherBox.classList.add('weather-box');
    
        // display of the weather
        const weatherData = document.createElement('p');
        weatherData.classList.add('weather-data');
        weatherData.textContent = `${cityName}: ${temperature}°C, ${description}`;
        weatherBox.appendChild(weatherData);
    
        // weather icom image
        const weatherImage = document.createElement('img');
        weatherImage.classList.add('weather-image');

        //picks image based off weather conditions
        const iconUrl = getWeatherIcon(description);
        weatherImage.src = iconUrl;
        weatherImage.alt = 'Icon';
        weatherBox.appendChild(weatherImage);

        //delete button
        const deleteButton = document.createElement('deletebutton');
        deleteButton.textContent = '(Delete-X)';
        deleteButton.classList.add('delete-button');
        weatherBox.appendChild(deleteButton);

        // actions for when delete button is clicked, the box is removed from the screen
        deleteButton.addEventListener('click', function() {
            weatherBox.remove();
            alert('Area has been deleted');
        });
    
        document.getElementById('cities-container').appendChild(weatherBox);
    }

      // Function to get the correct weather icon based on weather conditions in the area
      function getWeatherIcon(description) {

        let iconName = '';

       
        switch (description.toLowerCase()) {
            case 'clear':
                iconName = 'clear-day';
                break;
            case 'cloudy':
                iconName = 'cloudy';
                break;
            default:
                return '/static/weather/icons/clear-day.jpg'
        }
        return `/static/weather/icons/${iconName}.png`;
    }

    // Function to handle form submission and adding a new city
    function addCity(event) {
        event.preventDefault(); 

        const cityInput = document.getElementById('city-input');
        const cityName = cityInput.value.trim();
        
        if (cityName === '') {
            alert('Please enter a city name');
            return;
        }

        // Runs fetchWeather function and clears search box after 
        fetchWeather(cityName);
        cityInput.value = ''; 
    }

    // Event listener for form submission and adding a new city
    const addCityForm = document.getElementById('add-city-form');
    addCityForm.addEventListener('submit', addCity);

    loadedWeatherData(); 
});
