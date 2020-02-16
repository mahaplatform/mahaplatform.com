import Email from '../../../../apps/maha/models/email'
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

    const email = await Email.where({
      ses_id: message.mail.messageId
    }).fetch({
      transacting: req.trx
    })

    if(!email) return res.status(404).send('not found')

    if(message.notificationType === 'Delivery') {
      await email.save({
        was_delivered: true,
        delivered_at: moment(message.delivery.timestamp)
      }, {
        patch: true,
        transacting: req.trx
      })
    }

    if(message.notificationType === 'Bounce') {
      await email.save({
        was_bounced: true,
        bounce_type: message.bounce.bounceType,
        bounce_subtype: message.bounce.bounceSubType,
        bounced_at: moment()
      }, {
        patch: true,
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
    }

  }

  res.status(200).send(true)

}

export default feedbackRoute
