import mailboxQueue from '../../../../apps/maha/queues/mailbox_queue'
import collectObjects from '../../../utils/collect_objects'
import User from '../../../../apps/maha/models/user'
import s3 from '../../../services/s3'
import path from 'path'
import _ from 'lodash'

const mailboxes = collectObjects('mailboxes/*')

const simpleParser = Promise.promisify(require('mailparser').simpleParser)

const rootPath = path.resolve('.')

const mimeRoute = async (req, res) => {

  const message = await simpleParser(req.body['body-mime'])

  const user = await User.query(qb => {
    qb.whereRaw('(email=? OR secondary_email=?)', [
      message.from.value[0].address,
      message.from.value[0].address
    ])
    qb.orderBy('team_id')
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load sender'
  })

  const mailbox = mailboxes.reduce((found, mailbox) => {

    if(found) return found

    const options = mailbox.default

    return message.to.value.reduce((found, to) => {

      if(found) return found

      if(to.address.match(options.pattern) === null) return null

      const relativeFilepath = mailbox.filepath.replace(`${rootPath}/`, '')

      return {
        to: to.address,
        filepath: relativeFilepath,
        receiver: options.receiver,
        processor: options.processor
      }

    }, null)

  }, null)

  if(!mailbox) return res.status(404).respond({
    code: 404,
    message: 'Unable to find recipient'
  })

  const meta = await mailbox.receiver(req, {
    to: mailbox.to,
    message
  })

  const code = _.random(100000000, 999999999).toString(36)

  await s3.upload({
    ACL: 'private',
    Body: JSON.stringify(message),
    Bucket: process.env.AWS_BUCKET,
    ContentType: 'text/plain',
    Key: `emails/${code}`
  }).promise()

  mailboxQueue.enqueue(req, {
    filepath: mailbox.filepath,
    meta,
    code,
    user_id: user.get('id')
  })

  res.status(200).send('accepted')

}

export default mimeRoute
