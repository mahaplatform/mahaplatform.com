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

    const type = req.body.Message.notificationType

    const email = await Email.where({
      ses_id: req.body.MessageId
    }).fetch({
      transacting: req.trx
    })

    if(!email) return res.status(404).send('not found')

    if(type === 'Delivery') await email.save({
      was_delivered: true,
      delivered_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })

    if(type === 'Bounce') await email.save({
      was_bounced: true,
      bounced_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })

    if(type === 'Complaint') await email.save({
      was_complained: true,
      complained_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  res.status(200).send('')

}

export default feedbackRoute
