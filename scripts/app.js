const cityInput = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img ");
const flagImage = document.querySelector(".flag");
const countryMap = document.querySelector(".country-map");

const updateUI = (data) => {
  const { cityDetails, weather } = data;
  const countryName = cityDetails.Country.EnglishName;

  console.log(cityDetails);

  const countryInfo = async () => {
    const base = "https://restcountries.com/v3.1/name/";

    const response = await fetch(base + countryName.toLowerCase());
    const data = await response.json();
    const population = data[0].population;
    const cca2 = data[0].cca2.toLowerCase();
    const currency = JSON.stringify(data[0].currencies);
    // console.log(data[0]);

    const mapSrc = `img/countries/${cca2}.png`;
    countryMap.setAttribute("src", mapSrc);

    const flagSrc = `img/flags/${cca2}.jpg`;
    flagImage.setAttribute("src", flagSrc);

    // update details template
    details.innerHTML = `
    <h4 class="my-3 text-center">#${cityDetails.Rank}</h4>
    <div class="my-3 text-center">${weather.WeatherText}</div>
    <div class="display-4 my-4 text-center">
    <span class="my-3 text-center"></span>
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;c</span>
    </div>
    <h5 class="my-3">City Detail : ${cityDetails.EnglishName}</h5>
    <h5 class="my-3">TimeZone : ${cityDetails.TimeZone.Name}</h5>
    <h5 class="my-3">Lat & Lon : ${cityDetails.GeoPosition.Latitude} ${cityDetails.GeoPosition.Longitude}</h5>
    <h5 class="my-3">Country : ${countryName}</h5>
    <h5 class="my-3">Region : ${cityDetails.Region.EnglishName}</h5>
    <h5 class="my-3">Population : ${population}</h5>
    <h5 class="my-3">Currency : ${currency} </h5> `;
  };

  // update icon and image
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  // remove d-class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
  countryInfo();
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails: cityDetails, weather: weather };
};

cityInput.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityInput.city.value.trim();
  // cityInput.requestFullscreen();

  // update the UI
  updateCity(city).then((data) => updateUI(data));

  // store last city
  localStorage.setItem("city", city);
});

// local storage city updateUI

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city")).then((data) => updateUI(data));
}
