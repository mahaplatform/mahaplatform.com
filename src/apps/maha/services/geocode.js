import request from 'request-promise'
import _ from 'lodash'

const geocode = async ({ street1, street2, city, province, postalcode}) => {

  const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json'

  const parts = []

  if(street1) parts.push(street1)

  if(street2) parts.push(street2)

  if(city) parts.push(city)

  if(province) parts.push(province)

  if(postalcode) parts.push(postalcode)

  const address = parts.join(',').replace(/\s/g, '+').toLowerCase()

  const result = await request({
    uri: `${endpoint}?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    json: true
  })

  if(result.results.length < 1) return null

  const details = result.results[0].address_components.reduce((types, component) => ({
    county: component.long_name.toLowerCase().match(/county/) ? component.long_name : types.county,
    country: _.includes(component.types, 'country') ? component.long_name : types.country
  }), { county: null, country: null })

  const location = result.results[0].geometry.location

  return {
    ...details,
    latitude: location.lat,
    longitude: location.lng
  }

}

export default geocode
