import { s3 } from '@core/vendor/aws'

const copyObject = async (req, { from, to }) => {

  await s3.copyObject({
    ACL: 'public-read',
    CacheControl: 'max-age=0,no-cache',
    Bucket: process.env.AWS_WEB_BUCKET,
    CopySource: `/${process.env.AWS_WEB_BUCKET}/${from}`,
    Key: to
  }).promise()

}

export default copyObject
