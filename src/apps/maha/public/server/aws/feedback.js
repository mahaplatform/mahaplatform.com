import collectObjects from '@core/utils/collect_objects'
import ReceiveEmailQueue from '@apps/maha/queues/receive_email_queue'
import EmailActivity from '@apps/maha/models/email_activity'
import Email from '@apps/maha/models/email'
import request from 'request-promise'
import moment from 'moment'

const deliveryFiles = collectObjects('hooks/email/delivery.js')

const feedbackRoute = async (req, res) => {

  if(!req.body.Type) return res.status(404).send('not found')

  if(req.body.Type === 'SubscriptionConfirmation') {

    await request.get({
      url: req.body.SubscribeURL
    })

    return res.status(200).send('')

  }

  if(req.body.Type === 'Notification') {

    const message = JSON.parse(req.body.Message)

    if(message.notificationType === 'AmazonSnsSubscriptionSucceeded') return

    if(message.notificationType === 'Received') {

      await ReceiveEmailQueue.enqueue(req, {
        message_id: message.mail.messageId
      })

    } else {

      const email = await Email.where({
        ses_id: message.mail.messageId
      }).fetch({
        withRelated: ['team'],
        transacting: req.trx
      })

      if(!email) return res.status(200).send(true)

      req.team = email.related('team')

      if(message.notificationType === 'Delivery') {

        await email.save({
          was_delivered: true,
          delivered_at: moment(message.delivery.timestamp)
        }, {
          patch: true,
          transacting: req.trx
        })

        await EmailActivity.forge({
          team_id: email.get('team_id'),
          email_id: email.get('id'),
          type: 'delivery'
        }).save(null, {
          transacting: req.trx
        })

        await Promise.reduce(deliveryFiles, async (response, hook) => {
          return await hook.default(req, {
            email
          })
        }, null)

      } else if(message.notificationType === 'Bounce') {

        await email.save({
          was_bounced: true,
          bounce_type: message.bounce.bounceType,
          bounce_subtype: message.bounce.bounceSubType,
          bounced_at: moment()
        }, {
          patch: true,
          transacting: req.trx
        })

        if(email.get('email_address_id') !== null) {

          await email.load(['email_address'], {
            transacting: req.trx
          })

          const email_address = email.related('email_address')

          await email_address.save({
            was_hard_bounced: email.get('bounce_type') === 'Permanent' ? true : email_address.get('was_hard_bounced'),
            soft_bounce_count: email_address.get('soft_bounce_count') + (email.get('bounce_type') !== 'Permanent' ? 1 : 0),
            is_valid: email_address.get('soft_bounce_count') >= 2 || email.get('bounce_type') === 'Permanent' ? false : email_address.get('is_valid')
          }, {
            transacting: req.trx,
            patch: true
          })

        }

        await EmailActivity.forge({
          team_id: email.get('team_id'),
          email_id: email.get('id'),
          type: 'bounce'
        }).save(null, {
          transacting: req.trx
        })

      }

      if(message.notificationType === 'Complaint') {

        await email.save({
          was_complained: true,
          complaint_type: message.complaint.complaintFeedbackType,
          complained_at: moment()
        }, {
          patch: true,
          transacting: req.trx
        })

        await EmailActivity.forge({
          team_id: email.get('team_id'),
          email_id: email.get('id'),
          type: 'complaint'
        }).save(null, {
          transacting: req.trx
        })

      }

    }

  }

  res.status(200).send(true)

}

export default feedbackRoute
