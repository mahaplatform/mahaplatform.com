import maxmind from 'maxmind'
import path from 'path'

export const lookupIPAddress = () => {

  maxmind.open(path.join('maxmind.mmdb')).then((lookup) => {
    const result = lookup.get('68.175.138.123')
    // console.log(result)
    console.log(result)
  })

}
