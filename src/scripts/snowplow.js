import '@core/services/environment'
import collectObjects from '@core/utils/collect_objects'
import { upload } from '@core/services/aws/s3'
import log from '@core/utils/log'
import path from 'path'

const schemaFiles = collectObjects('schemas/*.json')

const processor = async () => {

  const req = {}

  await Promise.mapSeries(schemaFiles, async (file) => {
    log('info', 'snowplow', `Uploading schema ${file.filename}`)
    const schema = path.basename(file.filename, '.json')
    await upload(req, {
      content_type: 'application/json',
      bucket: 'schemas.mahaplatform.com',
      key: `schemas/com.mahaplatform/${schema}/jsonschema/1-0-0`,
      file_data: file.content
    })
  })

}

processor().then(process.exit)
