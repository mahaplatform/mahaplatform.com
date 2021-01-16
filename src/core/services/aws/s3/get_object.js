import { s3 } from '@core/vendor/aws'

const getObject = async (req, { bucket, key }) => {

  return await s3.getObject({
    Bucket: bucket || process.env.AWS_BUCKET,
    Key: key
  }).promise()

}

export default getObject
