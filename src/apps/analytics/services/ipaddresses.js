import IPAddress from '@apps/analytics/models/ipaddress'
import { getPostalCode } from './postal_codes'
import { getMetroCode } from './metro_codes'
import { lookupIPAddress } from './maxmind'
import { getCountry } from './countries'
import { getRegion } from './regions'
import { getCity } from './cities'

export const getIPAddress = async(req, { data }) => {

  const ipaddress = await IPAddress.query(qb => {
    qb.where('address', data.user_ipaddress)
  }).fetch({
    transacting: req.trx
  })

  if(ipaddress) return ipaddress

  const geo = await lookupIPAddress(req, {
    ipaddress: data.user_ipaddress
  })

  const city = await getCity(req, {
    text: geo.city
  })

  const region = await getRegion(req, {
    code: geo.region_code,
    text: geo.region
  })

  const country = await getCountry(req, {
    code: geo.country_code,
    text: geo.country
  })

  const metro_code = await getMetroCode(req, {
    text: geo.metro_code
  })

  const postal_code = await getPostalCode(req, {
    text: geo.postal_code
  })

  return await IPAddress.forge({
    address: data.user_ipaddress,
    city_id: city.get('id'),
    region_id: region.get('id'),
    country_id: country.get('id'),
    metro_code_id: metro_code.get('id'),
    postal_code_id: postal_code.get('id'),
    latitude: geo.latitude,
    longitude: geo.longitude
  }).save(null, {
    transacting: req.trx
  })

}
