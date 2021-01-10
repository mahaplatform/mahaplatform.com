import request from 'request-promise'
import tar from 'tar-stream'
import path from 'path'
import zlib from 'zlib'
import fs from 'fs'

export const updateDatabase = async () => {

  const database  = await request({
    uri: `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${process.env.MAXMIND_LICENSE_KEY}&suffix=tar.gz`,
    encoding: 'binary'
  })

  fs.writeFileSync(path.join('maxmind','geolitecity.tar.gz'), database, {
    encoding: 'binary'
  })

  const data = await new Promise((resolve, reject) => {

    let buffer = []

    var extract = tar.extract()

    extract.on('entry', (header, stream, cb) => {

      stream.on('data', (chunk) => {
        const file = path.basename(header.name)
        if(file !== 'GeoLite2-City.mmdb') return
        buffer.push(chunk)
      })

      stream.on('end', cb)

      stream.resume()

    })

    extract.on('finish', () => {
      resolve(Buffer.concat(buffer))
    })

    fs.createReadStream(path.join('maxmind','geolitecity.tar.gz')).pipe(zlib.createGunzip()).pipe(extract)

  })

  fs.writeFileSync(path.join('maxmind','geolitecity.mmdb'), data, {
    encoding: 'binary'
  })

  fs.unlinkSync(path.join('maxmind','geolitecity.tar.gz'))
}
