import { s3 } from '@core/vendor/aws'

const deleteObjects = async (req, { keys }) => {

  await s3.deleteObjects({
    Bucket: process.env.AWS_WEB_BUCKET,
    Delete: {
      Objects: keys.map(Key => ({ Key }))
    }
  }).promise()

}

export default deleteObjects
