import Queue from '../../../core/objects/queue'
import s3 from '../../../core/services/s3'
import User from '../models/user'
import path from 'path'

const processor = async (req, job) => {

  const { filepath, meta, code, user_id } = job.data

  req.user = await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  const file = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `emails/${code}`
  }).promise()

  const matches = filepath.match(/apps(.*)/)

  const mailboxPath = path.join(__dirname,'..','..',matches[1])

  const mailbox = require(mailboxPath).default

  await mailbox.processor(req, {
    meta,
    message: JSON.parse(file.Body)
  })

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

const MailboxQueue = new Queue({
  name: 'mailbox',
  processor
})

export default MailboxQueue
