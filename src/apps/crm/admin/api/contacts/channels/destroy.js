import socket from '../../../../../../web/core/services/routes/emitter'
import { contactActivity } from '../../../../services/activities'
import MailingAddress from '../../../../models/mailing_address'
import EmailAddress from '../../../../models/email_address'
import PhoneNumber from '../../../../models/phone_number'
import Contact from '../../../../models/contact'
import Consent from '../../../../models/consent'
import moment from 'moment'
import _ from 'lodash'

const _getKey = (type) => {
  if(type === 'email') return 'email_address_id'
  if(type === 'sms') return 'phone_number_id'
  if(type === 'voice') return 'phone_number_id'
  if(type === 'mail') return 'mailing_address_id'
}

const _getChannel = async (req, { type, id }) => {
  if(type === 'email') {
    return await EmailAddress.scope({
      team: req.team
    }).query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    }).then(result => result.get('address'))
  } else if(_.includes(['sms','voice'], type)) {
    return await PhoneNumber.scope({
      team: req.team
    }).query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    }).then(result => result.get('number'))
  } else if(type === 'mail') {
    return await MailingAddress.scope({
      team: req.team
    }).query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    }).then(result => result.get('address').description)
  }
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
    withRelated: ['program'],
    transacting: req.trx
  })

  await consent.save({
    optedout_at: moment(),
    optout_reason: req.body.optout_reason,
    optout_reason_other: req.body.optout_reason_other
  }, {
    transacting: req.trx
  })

  const channel = await _getChannel(req, {
    type: req.body.channel_type,
    id: req.body.channel_id
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'consent',
    story: 'updated communication preferences',
    data: {
      program: consent.related('program').get('title'),
      type: req.body.channel_type,
      [key.replace('_id','')]: channel,
      actions: [{ action: 'unconsented' }]
    }
  })

  await socket.refresh(req, [
    '/admin/crm/contacts',
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
