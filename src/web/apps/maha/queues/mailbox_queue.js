import Queue from '../../../core/objects/queue'
import aws from '../../../core/services/aws'
import path from 'path'
import mahaRequire from '../../../core/utils/maha_require'

const enqueue = async (req, trx, message) => message

const processor = async (job, trx) => {

  const { filepath, meta, code } = job.data

  const s3 = new aws.S3()

  const Key = `emails/${code}`

  const file = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key
  }).promise()

  const mailbox = mahaRequire(filepath).default

  const email = JSON.parse(file.Body)

  await mailbox.processor(meta, email, trx)

  await s3.deleteObjects({
    Bucket: process.env.AWS_BUCKET,
    Delete: {
      Objects: [
        { Key }
      ]
    }
  }).promise()

}

const mailboxQueue = new Queue({
  name: 'mailbox',
  enqueue,
  processor
})

export default mailboxQueue
