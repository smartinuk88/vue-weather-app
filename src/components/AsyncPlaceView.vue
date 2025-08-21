<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import WeatherList from './WeatherList.vue'
import HourlyWeatherCard from './HourlyWeatherCard.vue'
import DailyWeatherCard from './DailyWeatherCard.vue'
import CurrentWeatherCard from './CurrentWeatherCard.vue'
import WeatherOverview from './WeatherOverview.vue'

const router = useRouter()
const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lon}&exclude={part}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    )

    // Calc current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

    // Calc hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
    })

    return weatherData.data
  } catch (err) {
    console.log(err)
  }
}

const removePlace = () => {
  const places = JSON.parse(localStorage.getItem('savedPlaces'))
  const updatedPlaces = places.filter((place) => place.id !== route.query.id)
  localStorage.setItem('savedPlaces', JSON.stringify(updatedPlaces))

  router.push({
    name: 'home',
  })
}

const weatherData = await getWeatherData()
console.log(weatherData)
</script>

<template>
  <div class="flex-1 flex flex-col items-center p-6 text-center mx-auto max-w-4xl">
    <!-- Banner -->
    <div v-if="route.query.preview" class="p-4 w-full text-sm text-center bg-weatherSecondary">
      <p>You are currently previewing this location. Click the "+" to add to your locations.</p>
    </div>

    <!-- Weather Overview -->
    <WeatherOverview :route="route" :weatherData="weatherData" />

    <!-- Alerts -->
    <div
      v-if="weatherData.alerts && weatherData.alerts.length > 0"
      class="w-full p-4 text-sm rounded-lg shadow-lg mb-10 bg-weatherSecondary"
    >
      <h2 class="mb-2 text-lg">Alerts</h2>
      <ul class="flex flex-col gap-2 text-start">
        <li v-for="(alert, i) in weatherData.alerts" :key="i">
          {{
            new Date(alert.start).toLocaleTimeString('en-gb', {
              timeStyle: 'short',
            })
          }}
          -
          {{
            new Date(alert.end).toLocaleTimeString('en-gb', {
              timeStyle: 'short',
            })
          }}: <span class="uppercase font-semibold">{{ alert.event }}</span> -
          {{ alert.description }}
        </li>
      </ul>
    </div>

    <!-- Current Weather Data -->

    <h2 class="mb-4 text-lg">Current Weather</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full mb-20">
      <CurrentWeatherCard
        icon="fa-solid fa-sun"
        title="Feels Like"
        :value="Math.round(weatherData.current.feels_like)"
        unit="&deg;"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-sun"
        title="Sunrise"
        :value="
          new Date(weatherData.current.sunrise).toLocaleTimeString('en-gb', {
            timeStyle: 'short',
          })
        "
      />
      <CurrentWeatherCard
        icon="fa-solid fa-moon"
        title="Sunset"
        :value="
          new Date(weatherData.current.sunset).toLocaleTimeString('en-gb', {
            timeStyle: 'short',
          })
        "
      />
      <CurrentWeatherCard
        icon="fa-solid fa-sun"
        title="UV Index"
        :value="weatherData.current.uvi"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-wind"
        title="Wind Speed"
        :value="weatherData.current.wind_speed"
        unit="kph"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-wind"
        title="Wind Direction"
        :value="weatherData.current.wind_deg"
        unit="&deg;"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-droplet"
        title="Humidity"
        :value="weatherData.current.humidity"
        unit="%"
      />
    </div>

    <!-- Weather Hourly & Weekly -->

    <h2 class="mb-2 text-lg">Hourly Forecast</h2>
    <WeatherList>
      <HourlyWeatherCard
        v-for="hourData in weatherData.hourly"
        :key="hourData.dt"
        :data="hourData"
      />
    </WeatherList>

    <h2 class="mb-2 text-lg">7-Day Forecast</h2>
    <WeatherList>
      <DailyWeatherCard v-for="dayData in weatherData.daily" :key="dayData.dt" :data="dayData" />
    </WeatherList>

    <div
      v-if="!route.query.preview"
      @click="removePlace"
      class="flex items-center gap-2 cursor-pointer p-4 hover:opacity-80 duration-300"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove Location</p>
    </div>
  </div>
</template>
