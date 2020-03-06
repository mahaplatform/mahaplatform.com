import ReceiveEmailQueue from '../../../queues/receive_email_queue'
import EmailActivity from '../../../models/email_activity'
import Email from '../../../models/email'
import request from 'request-promise'
import moment from 'moment'

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

    if(message.notificationType === 'Received') {

      await ReceiveEmailQueue.enqueue(req, {
        message_id: message.mail.messageId
      })

    } else {

      const email = await Email.where({
        ses_id: message.mail.messageId
      }).fetch({
        transacting: req.trx
      })

      if(!email) return res.status(200).send(true)

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
