export const getWeather = async (city) => {
  const apiURL = `https://ru.api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=95f2254e0dedd1a3a97cdf2b6303e974&lang=ru`;

  const response = await fetch(apiURL, {
    method: "GET",
  });
  return await response.json();
};
