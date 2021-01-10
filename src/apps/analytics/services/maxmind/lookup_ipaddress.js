import maxmind from 'maxmind'
import path from 'path'

export const lookupIPAddress = async (req, { ipaddress }) => {

  const geo = await new Promise((resolve, reject) => {
    maxmind.open(path.join('maxmind','geolitecity.mmdb')).then((lookup) => {
      const result = lookup.get(ipaddress)
      resolve({
        city: result.city ? result.city.names.en : null,
        region: result.subdivisions ? result.subdivisions[0].names.en : null,
        region_code: result.subdivisions ? result.subdivisions[0].iso_code : null,
        country: result.country ? result.country.names.en : null,
        country_code: result.country ? result.country.iso_code : null,
        latitude: result.location ? result.location.latitude : null,
        longitude: result.location ? result.location.longitude : null,
        metro_code: result.location ? result.location.metro_code : null,
        postal_code: result.postal ? result.postal.code : null
      })
    })
  })

  return geo

}
