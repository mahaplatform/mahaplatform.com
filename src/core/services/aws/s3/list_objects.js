import { s3 } from '@core/vendor/aws'

const listObjects = async (req, { prefix }) => {

  const result = await s3.listObjects({
    Bucket: process.env.AWS_WEB_BUCKET,
    Prefix: prefix
  }).promise()

  return result.Contents.map(file => {
    return file.Key
  })

}

export default listObjects
