import maxmind from 'maxmind'
import path from 'path'

export const lookupIPAddress = async (req, { ipaddress }) => {

  const geo = await new Promise((resolve, reject) => {
    maxmind.open(path.join('maxmind.mmdb')).then((lookup) => {
      const result = lookup.get(ipaddress)
      resolve({
        city: result.city.names.en,
        region: result.subdivisions[0].names.en,
        region_code: result.subdivisions[0].iso_code,
        country: result.country.names.en,
        country_code: result.country.iso_code,
        latitude: result.location.latitude,
        longitude: result.location.longitude,
        metro_code: result.location.metro_code,
        postal_code: result.postal.code
      })
    })
  })

  return geo

}
