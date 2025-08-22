<script setup>
import { useRoute, useRouter } from 'vue-router'
import WeatherList from './WeatherList.vue'
import HourlyWeatherCard from './HourlyWeatherCard.vue'
import DailyWeatherCard from './DailyWeatherCard.vue'
import CurrentWeatherCard from './CurrentWeatherCard.vue'
import WeatherOverview from './WeatherOverview.vue'
import { onMounted, ref } from 'vue'
import { getWeatherData } from '@/services/openweatherService'

const router = useRouter()
const route = useRoute()
const weatherData = ref({ data: null, error: null })

onMounted(async () => {
  const { data, error } = await getWeatherData(route.query.lat, route.query.lon)
  if (error) {
    console.error(error)
    weatherData.value = { data: null, error: 'Could not load weather data.' }
  } else {
    weatherData.value = { data, error: null }
    console.log(weatherData)
  }
})

const removePlace = () => {
  const places = JSON.parse(localStorage.getItem('savedPlaces'))
  const updatedPlaces = places.filter((place) => place.id !== route.query.id)
  localStorage.setItem('savedPlaces', JSON.stringify(updatedPlaces))

  router.push({
    name: 'home',
  })
}
</script>

<template>
  <div
    v-if="weatherData.data"
    class="flex-1 flex flex-col items-center p-6 text-center mx-auto max-w-4xl"
  >
    <!-- Banner -->
    <div v-if="route.query.preview" class="p-4 mb-4 w-full text-sm text-center bg-weatherSecondary">
      <p>You are currently previewing this location. Click the "+" to add to your locations.</p>
    </div>

    <!-- Weather Overview -->
    <WeatherOverview :route="route" :weatherData="weatherData.data" />

    <!-- Alerts -->
    <div
      v-if="weatherData.data.alerts && weatherData.data.alerts.length > 0"
      class="w-full p-4 text-sm rounded-lg shadow-lg mb-10 bg-weatherSecondary"
    >
      <h2 class="mb-2 text-lg">Alerts</h2>
      <ul class="flex flex-col gap-2 text-start">
        <li v-for="(alert, i) in weatherData.data.alerts" :key="i">
          {{
            new Date(alert.start * 1000).toLocaleTimeString('en-gb', {
              timeStyle: 'short',
              timeZone: weatherData.data.timezone,
            })
          }}
          -
          {{
            new Date(alert.end * 1000).toLocaleTimeString('en-gb', {
              timeStyle: 'short',
              timeZone: weatherData.data.timezone,
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
        :value="Math.round(weatherData.data.current.feels_like)"
        unit="&deg;"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-sun"
        title="Sunrise"
        :value="
          new Date(weatherData.data.current.sunrise * 1000).toLocaleTimeString('en-gb', {
            timeStyle: 'short',
            timeZone: weatherData.data.timezone,
          })
        "
      />
      <CurrentWeatherCard
        icon="fa-solid fa-moon"
        title="Sunset"
        :value="
          new Date(weatherData.data.current.sunset * 1000).toLocaleTimeString('en-gb', {
            timeStyle: 'short',
            timeZone: weatherData.data.timezone,
          })
        "
      />
      <CurrentWeatherCard
        icon="fa-solid fa-sun"
        title="UV Index"
        :value="weatherData.data.current.uvi"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-wind"
        title="Wind Speed"
        :value="weatherData.data.current.wind_speed"
        unit="kph"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-wind"
        title="Wind Direction"
        :value="weatherData.data.current.wind_deg"
        unit="&deg;"
      />
      <CurrentWeatherCard
        icon="fa-solid fa-droplet"
        title="Humidity"
        :value="weatherData.data.current.humidity"
        unit="%"
      />
    </div>

    <!-- Weather Hourly & Weekly -->

    <h2 class="mb-2 text-lg">Hourly Forecast</h2>
    <WeatherList>
      <HourlyWeatherCard
        v-for="hourData in weatherData.data.hourly"
        :key="hourData.dt"
        :data="hourData"
      />
    </WeatherList>

    <h2 class="mb-2 text-lg">7-Day Forecast</h2>
    <WeatherList>
      <DailyWeatherCard
        v-for="dayData in weatherData.data.daily"
        :key="dayData.dt"
        :data="dayData"
      />
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

  <div
    v-else-if="weatherData.error"
    class="flex-1 flex items-center justify-center p-6 text-center"
  >
    Failed to load weather data. Please try again later.
  </div>
</template>
