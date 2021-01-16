import { s3 } from '@core/vendor/aws'

const listObjects = async (req, { bucket, prefix }) => {

  const result = await s3.listObjects({
    Bucket: bucket || process.env.AWS_WEB_BUCKET,
    ...prefix ? { Prefix: prefix } : {}
  }).promise()

  return result.Contents.map(file => {
    return file.Key
  })

}

export default listObjects
