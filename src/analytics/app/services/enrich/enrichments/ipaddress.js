import { lookupIPAddress } from '@apps/analytics/services/maxmind'

const ipaddressEnrichment = async(req, event) => {

  if(!event.user_ipaddress) return event

  const geo = await lookupIPAddress(req, {
    ipaddress: event.user_ipaddress
  })

  return {
    ...event,
    ip_isp: null,
    ip_organization: null,
    ip_domain: null,
    ip_netspeed: null,
    geo_country_code: geo.country_code,
    geo_country: geo.country,
    geo_region_code: geo.region_code,
    geo_region_name: geo.region,
    geo_region: geo.region,
    geo_city: geo.city,
    geo_metro_code: geo.metro_code,
    geo_zipcode: geo.postal_code,
    geo_latitude: geo.latitude,
    geo_longitude: geo.longitude
  }

}

export default ipaddressEnrichment
