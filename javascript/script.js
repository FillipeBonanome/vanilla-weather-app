const apiKey = '|INSIRA SUA API KEY|';                                               //Nunca deixe sua API Key exposta em produção
const weatherImage = document.getElementById('weather-image');
const temperature = document.getElementById('temperature');
const locationP = document.getElementById('location');
const weatherDescription = document.getElementById('weather-description');
const placeSelect = document.getElementById('place-select');
const appTime = document.getElementById('time');

placeSelect.addEventListener('change', () => {
    const selectedPlace = placeSelect.value;
    fetchWeatherData(selectedPlace);
});

const placeOptions = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Salvador',
    'Curitiba',
    'Porto Alegre',
    'Recife',
    'Fortaleza',
    'Brasília',
    'Manaus',
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Tokyo',
    'Osaka',
    'Kyoto',
]

function populatePlaceOptions() {
    placeOptions.forEach(place => {
        const option = document.createElement('option');
        option.value = place;
        option.textContent = place;
        placeSelect.appendChild(option);
    });
}

async function fetchWeatherData(city) {
    const url = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city + '&lang=pt';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert('Não foi possível obter os dados do clima para ' + city);
            throw new Error('Erro na requisição: ' + response.status);
        }

        const data = await response.json();

        //Atualiza o ícone de acordo com o clima atual
        const icon = data.current.condition.icon;
        weatherImage.src = icon;

        //Atualiza a temperatura
        temperature.textContent = Math.round(data.current.temp_c) + '°C';

        //Atualiza o local
        locationP.textContent = `${data.location.name}, ${data.location.country}`;

        //Atualiza a descrição do clima
        weatherDescription.textContent = data.current.condition.text;
    } catch (error) {
        console.error('Erro ao construir a URL:', error);
    }
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    appTime.textContent = `${hours}:${minutes}`;
}

//Atualiza o horário a cada minuto
setInterval(updateTime, 60000);
updateTime();

//Popula o select com as opções de cidades
populatePlaceOptions()

//Busca o clima de São Paulo ao carregar a página
fetchWeatherData('São Paulo');