import { withTransaction } from '../../utils/with_transaction'
import EmailActivity from '../../../apps/maha/models/email_activity'
import Notification from '../../../apps/maha/models/notification'
import EmailLink from '../../../apps/maha/models/email_link'
import Session from '../../../apps/maha/models/session'
import Email from '../../../apps/maha/models/email'
import socket from '../../services/emitter'
import request from 'request-promise'
import bodyParser from 'body-parser'
import { Router } from 'express'
import moment from 'moment'
import path from 'path'


const trackerFile = path.resolve(__dirname, '..', '..', '..', 'public', 'images', 'tracker.png')

// track email activity
const track = async (email, trx, activity) => {

  // log that it has been viewed

  const data = { was_delivered: true, was_opened: true }

  await email.save(data, { patch: true, transacting: trx })

  // check if we have recorded this activity in the last 5 minutes

  const activityData = {
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    ...activity
  }

  const query = qb => qb.where('created_at', '>', moment().subtract(5, 'minutes'))

  const emailActivity = await EmailActivity.where(activityData).query(query).fetch({ transacting: trx })

  // if not, record email activity

  if(!emailActivity) await EmailActivity.forge(activityData).save(null, { transacting: trx })

}

const emailMiddleware = new Router({ mergeParams: true })

emailMiddleware.use(bodyParser.json({ limit: '5mb', type: '*/*' }))

emailMiddleware.get('/v:email_code([a-z0-9]{4})', (req, res) => withTransaction(req, res, async (trx) => {

  const email = await Email.where({ code: req.params.email_code }).fetch({ transacting: trx })

  if(!email) return res.status(404).send('not found')

  await track(email, trx, { type: 'open' })

  res.sendFile(trackerFile)

}))

emailMiddleware.get('/c:email_code([a-z0-9]{4}):link_code([a-z0-9]{4})', (req, res) => withTransaction(req, res, async (trx) => {

  const email = await Email.where({ code: req.params.email_code }).fetch({ transacting: trx })

  if(!email) return res.status(404).send('not found')

  const emailLink = await EmailLink.where({ code: req.params.link_code }).fetch({ transacting: trx })

  if(!emailLink) return res.status(404).send('not found')

  await track(email, trx, { email_link_id: emailLink.get('id'), type: 'click' })

  res.redirect(emailLink.get('url'))

}))

emailMiddleware.get('/ns:codes', (req, res) => withTransaction(req, res, async (trx) => {

  const codes = req.params.codes.match(/.{1,4}/g)

  const query = qb => {

    qb.whereIn('code', codes)

    qb.where('is_seen', false)

  }

  const notifications = await Notification.query(query).fetchAll({ transacting: trx })

  await Promise.map(notifications.toArray(), async (notification) => {

    notification.save({ is_seen: true }, { patch: true, transacting: trx })

  })

  res.sendFile(trackerFile)

}))

emailMiddleware.get('/nv:code', (req, res) => withTransaction(req, res, async (trx) => {

  const notification = await Notification.where({ code: req.params.code }).fetch({ patch: true, transacting: trx })

  if(!notification) return res.status(404).send('not found')

  await notification.save({ is_seen: true, is_visited: true }, { transacting: trx })

  res.redirect(notification.get('url'))

}))

emailMiddleware.get('/so:code', (req, res) => withTransaction(req, res, async (trx) => {

  const session = await Session.where({
    code: req.params.code
  }).fetch({
    transacting: trx,
    withRelated: ['user']
  })

  await socket.in(`/admin/sessions/${session.get('id')}`).emit('message', {
    action: 'signout'
  })

  await session.related('user').save({
    is_blocked: true
  }, {
    patch: true,
    transacting: trx
  })

  res.send('signed out')

}))

emailMiddleware.post('/aws/feedback', (req, res) => withTransaction(req, res, async (trx) => {

  if(!req.body.Type) return res.status(404).send('not found')

  if(req.body.Type === 'SubscriptionConfirmation') {

    await request.get({ url: req.body.SubscribeURL })

    return res.status(200).send('')

  }

  if(req.body.Type === 'Notification') {

    const type = req.body.Message.notificationType

    const email = await Email.where({ ses_id: req.body.MessageId }).fetch({ transacting: trx })

    if(!email) return res.status(404).send('not found')

    if(type === 'Delivery') await email.save({ was_delivered: true }, { patch: true, transacting: trx  })

    if(type === 'Bounce') await email.save({ was_bounced: true }, { patch: true, transacting: trx  })

    if(type === 'Complaint') await email.save({ was_complained: true }, { patch: true, transacting: trx  })

  }

  res.status(200).send('')

}))

export default emailMiddleware
