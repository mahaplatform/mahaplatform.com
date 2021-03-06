import { s3 } from '@core/vendor/aws'

export const readFile = async (Key) => {
  const chunk = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key
  }).promise()
  return chunk.Body
}

export const listFiles = async (Prefix) => {
  const parts = await s3.listObjects({
    Bucket: process.env.AWS_BUCKET,
    Prefix
  }).promise()
  return parts.Contents.map(file => file.Key)
}

export const saveFile = async (filedata, filepath, content_type) => {
  await s3.upload({
    ACL: 'private',
    Body: filedata,
    Bucket: process.env.AWS_BUCKET,
    ContentType: content_type,
    CacheControl: 'immutable,max-age=100000000,public',
    Key: filepath
  }).promise()
}

export const deleteFiles = async (filepaths) => {
  await s3.deleteObjects({
    Bucket: process.env.AWS_BUCKET,
    Delete: {
      Objects: filepaths.map(Key => ({ Key }))
    }
  }).promise()
}
