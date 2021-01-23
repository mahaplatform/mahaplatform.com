import { deleteObjects, upload } from '@core/services/aws/s3'
import path from 'path'
import fs from 'fs'

const test = async () => {

  await upload(null, {
    bucket: 'twiml.mahaplatform.com',
    key: 'inbound/16072462347.json',
    cache_control: 'max-age=0,no-cache',
    file_data: fs.readFileSync(path.join(__dirname,'16072462347.json'))
  })

}

export default test
