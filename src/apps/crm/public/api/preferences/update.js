import { checkToken } from '@core/services/routes/checks'
import EmailActivity from '@apps/maha/models/email_activity'
import socket from '@core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import { updateConsent } from '../../../services/consents'
import Email from '@apps/maha/models/email'

const updateRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.channel_code)) {
    return res.status(401).send('Unauthorized')
  }

  const email = await Email.query(qb => {
    qb.where('code', req.params.email_code)
  }).fetch({
    withRelated: ['team','email_campaign.program'],
    transacting: req.trx
  })

  req.team = email.related('team')

  const { contact, activity } = await updateConsent(req, {
    program: email.related('email_campaign').related('program'),
    channel_type: req.params.type,
    channel_code: req.params.code,
    optout: req.body.optout || req.body.optin !== true,
    optin_reason: 'consent',
    optout_reason: null,
    optout_reason_other: null,
    topic_ids: req.body.topic_ids
  })

  await contact.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }, {
    transacting: req.trx,
    patch: true
  })

  if(req.body.optout === true) {
    await email.save({
      was_unsubscribed: true
    }, {
      transacting: req.trx,
      patch: true
    })
    await EmailActivity.forge({
      team_id: email.get('team_id'),
      email_id: email.get('id'),
      type: 'unsubscribe'
    }).save(null, {
      transacting: req.trx
    })
  }

  await contactActivity(req, {
    contact,
    type: 'consent',
    story: 'updated communication preferences',
    data: activity
  })

  await socket.refresh(req, [
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
