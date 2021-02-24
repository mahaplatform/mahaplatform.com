import PostalCode from '@apps/analytics/models/postal_code'
import MetroCode from '@apps/analytics/models/metro_code'
import IPAddress from '@apps/analytics/models/ipaddress'
import Country from '@apps/analytics/models/country'
import Region from '@apps/analytics/models/region'
import City from '@apps/analytics/models/city'

export const getIPAddress = async(req, { enriched }) => {

  const ipaddress = await IPAddress.query(qb => {
    qb.where('address', enriched.user_ipaddress)
  }).fetch({
    transacting: req.analytics
  })

  if(ipaddress) return ipaddress

  const city = enriched.geo_city ? await City.fetchOrCreate({
    text: enriched.geo_city
  }, {
    transacting: req.analytics
  }) : null

  const region = enriched.geo_region_name ? await Region.fetchOrCreate({
    code: enriched.geo_region_code,
    text: enriched.geo_region_name
  }, {
    transacting: req.analytics
  }) : null

  const country = enriched.geo_country ? await Country.fetchOrCreate({
    code: enriched.geo_country_code,
    text: enriched.geo_country
  }, {
    transacting: req.analytics
  }) : null

  const metro_code = enriched.geo_metro_code ? await MetroCode.fetchOrCreate({
    text: enriched.geo_metro_code
  }, {
    transacting: req.analytics
  }) : null

  const postal_code = enriched.geo_zipcode ? await PostalCode.fetchOrCreate({
    text: enriched.geo_zipcode
  }, {
    transacting: req.analytics
  }) : null

  return await IPAddress.forge({
    address: enriched.user_ipaddress,
    city_id: city ? city.get('id') : null,
    region_id: region ? region.get('id') : null,
    country_id: country ? country.get('id') : null,
    metro_code_id: metro_code ? metro_code.get('id') : null,
    postal_code_id: postal_code ? postal_code.get('id') : null,
    latitude: enriched.geo_latitude,
    longitude: enriched.geo_longitude
  }).save(null, {
    transacting: req.analytics
  })

}
