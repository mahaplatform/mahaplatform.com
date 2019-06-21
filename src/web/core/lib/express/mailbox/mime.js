import mailboxQueue from '../../../../apps/maha/queues/mailbox_queue'
import collectObjects from '../../../utils/collect_objects'
import aws from '../../../services/aws'
import path from 'path'
import _ from 'lodash'

const mailboxes = collectObjects('mailboxes/*')

const simpleParser = Promise.promisify(require('mailparser').simpleParser)

const mimeRoute = async (req, res) => {

  console.log(Object.keys(req.body))

  console.log(req.body)

  const mime = req.body['body-mime']

  const message = await simpleParser(mime)

  const mailbox = mailboxes.reduce((found, mailbox) => {

    if(found) return found

    const options = mailbox.default

    return message.to.value.reduce((found, to) => {

      if(found) return found

      if(to.address.match(options.pattern) === null) return null

      const rootPath = path.resolve('.')

      const relativeFilepath = mailbox.filepath.replace(`${rootPath}/`, '')

      return {
        to: to.address,
        filepath: relativeFilepath,
        receiver: options.receiver,
        processor: options.processor
      }

    }, null)

  }, null)

  if(!mailbox) return res.status(404).send('not found')

  const meta = await mailbox.receiver(mailbox.to, message, req.trx)

  const code = _.random(100000000, 999999999).toString(36)

  const s3 = new aws.S3()

  await s3.upload({
    ACL: 'private',
    Body: JSON.stringify(message),
    Bucket: process.env.AWS_BUCKET,
    ContentType: 'text/plain',
    Key: `emails/${code}`
  }).promise()

  const filepath = mailbox.filepath

  mailboxQueue.enqueue(req, { filepath, meta, code })

  res.status(200).send('accepted')

}

export default mimeRoute
