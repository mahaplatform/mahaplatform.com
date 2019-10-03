import socket from '../../../../../../web/core/services/routes/emitter'
import Contact from '../../../../models/contact'
import Consent from '../../../../models/consent'
import moment from 'moment'

const _getKey = (type) => {
  if(type === 'email') return 'email_address_id'
  if(type === 'sms') return 'phone_number_id'
  if(type === 'voice') return 'phone_number_id'
  if(type === 'mail') return 'mailing_address_id'
}

const destroyRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const key = _getKey(req.body.channel_type)

  const consent = await Consent.scope({
    team: req.team
  }).query(qb => {
    qb.where(key, req.body.channel_id)
    qb.where('type', req.body.channel_type)
    qb.where('program_id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  await consent.save({
    unsubscribed_at: moment(),
    optout_reason: req.body.optout_reason,
    optout_reason_other: req.body.optout_reason_other
  }, {
    transacting: req.trx
  })

  // await contactActivity(req, {
  //   user: req.user,
  //   contact,
  //   type: 'preferences',
  //   story: 'opted in to marketing channel',
  //   data: {
  //     program: program.get('title'),
  //     [req.body.channel_type]: channel
  //   }
  // })

  await socket.refresh(req, [
    '/admin/crm/contacts',
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
