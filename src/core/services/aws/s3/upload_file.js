import { s3 } from '@core/vendor/aws'
import mime from 'mime-types'
import path from 'path'

const getContentType = (key) => {
  const filename = path.basename(key)
  return mime.lookup(filename)
}

const uploadFile = async (req, { key, content_type, file_data }) => {

  await s3.upload({
    ACL: 'public-read',
    Body: file_data,
    Bucket: process.env.AWS_WEB_BUCKET,
    ContentType: content_type || getContentType(key),
    Key: key
  }).promise()

}

export default uploadFile
