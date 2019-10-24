import '../core/services/environment'
import knex from '../core/services/knex'
import s3 from '../core/services/s3'
import request from 'request-promise'
import crypto from 'crypto'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const processor = async () => {

  const assets = await knex('maha_assets').where('id','>','9160').orderBy('id','asc')

  const data = await Promise.reduce(assets, async (data, asset, index) => {

    console.log(asset.id, asset.original_file_name)

    const { id, content_type, file_name } = asset

    const url = s3.getSignedUrl('getObject', {
      Bucket: 'cdn.mahaplatform.com',
      Key: `assets/${id}/${file_name}`,
      Expires: 60
    })

    try {

      const filedata = await request.get(url, {
        encoding: null
      })

      const fingerprint = crypto.createHash('md5').update(filedata).digest('hex')

      const metadata = content_type.match(/(jpg|jpeg|png|gif)/) ? await sharp(filedata).metadata() : {}

      return [
        ...data,
        [id,fingerprint,metadata.width,metadata.height]
      ]

    } catch(e) {
      return data
    }

  }, [])

  const output = data.map(row => row.join(',')).join('\n')

  fs.writeFileSync(path.join('metadata.csv'), output, 'utf8')

}

processor().then(process.exit)
