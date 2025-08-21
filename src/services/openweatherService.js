import axios from 'axios'

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    )

    const weatherData = response.data

    // Calc current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.current.dt * 1000 + localOffset
    weatherData.currentTime = utc + 1000 * weatherData.timezone_offset

    // Calc hourly weather offset
    weatherData.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * weatherData.timezone_offset
    })

    return weatherData
  } catch (err) {
    console.error('Failed to fetch weather data: ', err)
    throw err
  }
}

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    )

    const currentWeather = response.data

    return currentWeather
  } catch (err) {
    console.error('Failed to fetch current weather data: ', err)
    throw err
  }
}
