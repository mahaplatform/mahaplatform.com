import Queue from '../../../core/objects/queue'
import s3 from '../../../core/services/s3'
import path from 'path'

const enqueue = async (req, message) => message

const processor = async (job, trx) => {

  const { filepath, meta, code } = job.data

  const file = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `emails/${code}`
  }).promise()

  const mailboxPath = path.join(__dirname,'..','..','..',filepath)

  const mailbox = require(mailboxPath).default

  const email = JSON.parse(file.Body)

  await mailbox.processor(meta, email, trx)

  await s3.deleteObjects({
    Bucket: process.env.AWS_BUCKET,
    Delete: {
      Objects: [
        {
          Key: `emails/${code}`
        }
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
