const Key = "NpVpVP3jG0ww0y9AYZj9u1FqXA44fniB";

//get current weather information

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${Key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

//get city information
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${Key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};
