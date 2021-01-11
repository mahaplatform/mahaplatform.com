import maxmind from 'maxmind'
import path from 'path'

export const lookupIPAddress = async (req, { ipaddress }) => {

  const geo = await new Promise((resolve, reject) => {
    maxmind.open(path.join('maxmind','geolitecity.mmdb')).then((lookup) => {
      const result = lookup.get(ipaddress)

      resolve({
        city: result && result.city ? result.city.names.en : null,
        region: result && result.subdivisions ? result.subdivisions[0].names.en : null,
        region_code: result && result.subdivisions ? result.subdivisions[0].iso_code : null,
        country: result && result.country ? result.country.names.en : null,
        country_code: result && result.country ? result.country.iso_code : null,
        latitude: result && result.location ? result.location.latitude : null,
        longitude: result && result.location ? result.location.longitude : null,
        metro_code: result && result.location ? result.location.metro_code : null,
        postal_code: result && result.postal ? result.postal.code : null
      })
    })
  })

  return geo

}
