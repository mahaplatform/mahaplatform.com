import Queue from '../../../core/objects/queue'
import s3 from '../../../core/services/s3'
import User from '../models/user'
import path from 'path'

const enqueue = async (req, message) => message

const processor = async (job, trx) => {

  const { filepath, meta, code, user_id } = job.data

  const user = await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    withRelated: ['team'],
    transacting: trx
  })

  const file = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `emails/${code}`
  }).promise()

  const matches = filepath.match(/apps(.*)/)

  const mailboxPath = path.join(__dirname,'..','..',matches[1])

  const mailbox = require(mailboxPath).default

  await mailbox.processor({
    user: user,
    team: user.related('team'),
    trx
  }, {
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
  enqueue,
  processor
})

export default MailboxQueue
