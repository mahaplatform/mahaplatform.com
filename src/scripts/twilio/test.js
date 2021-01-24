import { deleteObjects, upload } from '@core/services/aws/s3'
import path from 'path'
import fs from 'fs'

const test = async () => {

  await upload(null, {
    acl: 'private',
    bucket: 'cdn.mahaplatform.com',
    key: 'twiml/inbound/16072462347',
    cache_control: 'max-age=0,no-cache',
    content_type: 'application/json',
    file_data: fs.readFileSync(path.join(__dirname,'16072462347.json'))
  })

}

export default test
