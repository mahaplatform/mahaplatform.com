import request from 'request-promise'
import _ from 'lodash'

const geocode = async (address) => {

  if(address.latitude && address.longitude && address.county && address.country) return address

  const { street_1, street_2, city, state_province, postal_code } = address

  const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json'

  const fulladdress = address || [street_1,street_2,city,state_province,postal_code].filter(item => typeof(item) === 'string' && item.length > 0).join(', ').toLowerCase()

  const result = await request({
    uri: `${endpoint}?address=${fulladdress}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
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
