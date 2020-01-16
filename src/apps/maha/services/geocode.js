import request from 'request-promise'
import _ from 'lodash'

const getType = (result, type) => {
  const component = result.address_components.find(component => {
    return _.includes(component.types, type)
  })
  return component ? component.short_name : null
}

const getCounty = (result) => {
  const component = result.address_components.find(component => {
    return component.long_name.toLowerCase().match(/county/)
  })
  return component ? component.short_name : null
}

const getFullAddress = (address) => {
  if(address.latitude && address.longitude && address.county && address.country) return address
  const { street_1, street_2, city, state_province, postal_code } = address
  const parts = [street_1,street_2,city,state_province,postal_code]
  return address || parts.filter(item => {
    return typeof(item) === 'string' && item.length > 0
  }).join(', ').toLowerCase()
}

const geocode = async (address) => {
  const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json'
  const fulladdress = getFullAddress(address)
  const response = await request({
    uri: `${endpoint}?address=${fulladdress}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    json: true
  })
  if(response.results.length < 1) return null
  const result = response.results[0]
  return {
    description: result.formatted_address,
    street_1: `${getType(result, 'street_number')} ${getType(result, 'route')}`,
    city: getType(result, 'locality'),
    state_province: getType(result, 'administrative_area_level_1'),
    postal_code: getType(result, 'postal_code'),
    county: getCounty(result),
    country: getType(result, 'country'),
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng
  }
}

export default geocode
