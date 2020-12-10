import { s3 } from '@core/vendor/aws'
import mime from 'mime-types'
import path from 'path'

const uploadFile = async (req, { key, file_data }) => {

  const filename = path.basename(key)

  await s3.upload({
    ACL: 'public-read',
    Body: file_data,
    Bucket: process.env.AWS_WEB_BUCKET,
    ContentType: mime.lookup(filename),
    Key: key
  }).promise()

}

export default uploadFile
