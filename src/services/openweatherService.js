import axios from 'axios'

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    )

    const weatherData = response.data

    return { data: weatherData, error: null }
  } catch (err) {
    console.error('Failed to fetch weather data: ', err)
    return { data: null, error: err }
  }
}

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    )

    return { data: response.data, error: null }
  } catch (err) {
    console.error('Failed to fetch current weather data: ', err)
    return { data: null, error: err }
  }
}
