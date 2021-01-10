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
    transacting: req.analytics
  })

  if(ipaddress) return ipaddress

  const geo = await lookupIPAddress(req, {
    ipaddress: data.user_ipaddress
  })

  const city = geo.city ? await City.fetchOrCreate({
    text: geo.city
  }, {
    transacting: req.analytics
  }) : null

  const region = geo.region ? await Region.fetchOrCreate({
    code: geo.region_code,
    text: geo.region
  }, {
    transacting: req.analytics
  }) : null

  const country = geo.country ? await Country.fetchOrCreate({
    code: geo.country_code,
    text: geo.country
  }, {
    transacting: req.analytics
  }) : null

  const metro_code = geo.metro_code ? await MetroCode.fetchOrCreate({
    text: geo.metro_code
  }, {
    transacting: req.analytics
  }) : null

  const postal_code = geo.postal_code ? await PostalCode.fetchOrCreate({
    text: geo.postal_code
  }, {
    transacting: req.analytics
  }) : null

  return await IPAddress.forge({
    address: data.user_ipaddress,
    city_id: city ? city.get('id') : null,
    region_id: region ? region.get('id') : null,
    country_id: country ? country.get('id') : null,
    metro_code_id: metro_code ? metro_code.get('id') : null,
    postal_code_id: postal_code ? postal_code.get('id') : null,
    latitude: geo.latitude,
    longitude: geo.longitude
  }).save(null, {
    transacting: req.analytics
  })

}
