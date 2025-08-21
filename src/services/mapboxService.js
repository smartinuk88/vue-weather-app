import axios from 'axios'

export const searchPlaces = async (query) => {
  if (!query) return null

  const result = await axios.get(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&types=place&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`,
  )

  return result.data.features
}
