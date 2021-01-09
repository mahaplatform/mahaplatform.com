import PostalCode from '@apps/analytics/models/postal_code'
import MetroCode from '@apps/analytics/models/metro_code'
import IPAddress from '@apps/analytics/models/ipaddress'
import Country from '@apps/analytics/models/country'
import Region from '@apps/analytics/models/region'
import City from '@apps/analytics/models/city'
import { lookupIPAddress } from './maxmind'

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

  const city = await City.fetchOrCreate({
    text: geo.city
  }, {
    transacting: req.trx
  })

  const region = await Region.fetchOrCreate({
    code: geo.region_code,
    text: geo.region
  }, {
    transacting: req.trx
  })

  const country = await Country.fetchOrCreate({
    code: geo.country_code,
    text: geo.country
  }, {
    transacting: req.trx
  })

  const metro_code = await MetroCode.fetchOrCreate({
    text: geo.metro_code
  }, {
    transacting: req.trx
  })

  const postal_code = await PostalCode.fetchOrCreate({
    text: geo.postal_code
  }, {
    transacting: req.trx
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
