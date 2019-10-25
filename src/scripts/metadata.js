import '../core/services/environment'
import csvparse from 'csv-parse/lib/sync'
import knex from '../core/services/knex'
import s3 from '../core/services/s3'
import request from 'request-promise'
import crypto from 'crypto'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const processor = async () => {

  const url = s3.getSignedUrl('getObject', {
    Bucket: 'cdn.mahaplatform.com',
    Key: 'data/metadata.csv',
    Expires: 60
  })

  const existing = await request.get(url, {
    encoding: null
  })

  const parsed = csvparse(existing)

  const last = parsed.slice(-1)[0]

  const assets = await knex('maha_assets').where('id','>',last[0]).orderBy('id','asc')

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

  fs.writeFileSync(path.join('metadata.csv'), existing+output, 'utf8')

  await s3.upload({
    ACL: 'private',
    Body: existing+output,
    Bucket: 'cdn.mahaplatform.com',
    ContentType: 'text/csv',
    Key: 'data/metadata.csv'
  }).promise()

}

processor().then(process.exit)
