const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "42af2a1eca367d07538683b55e4ab480"

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayweatherInto(weatherData);
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Input a city");
    }
})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const res = await fetch(apiUrl);
    if(!res.ok){
        throw new Error("Could not get weather data");
    }

    return await res.json();
}

async function displayweatherInto(data){
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data
    card.textContent="";
    card.style.display="flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidDisplay = document.createElement("p");
    const desc = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent=`${(temp - 273.15).toFixed(1)} Degree`;
    humidDisplay.textContent=`Humidity: ${humidity}%`;
    desc.textContent=`${description}`;

    cityDisplay.classList.add("cityDisplay");
    cityDisplay.classList.add("tempDisplay");
    humidDisplay.classList.add("humidDisplay");
    desc.classList.add("desc")

    card.appendChild(cityDisplay);  
    card.appendChild(tempDisplay);
    card.appendChild(humidDisplay);
    card.appendChild(desc)
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}