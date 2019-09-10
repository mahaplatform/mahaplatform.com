import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../../services/activities'
import EmailAddress from '../../../../models/email_address'
import PhoneNumber from '../../../../models/phone_number'
import Program from '../../../../../maha/models/program'
import Address from '../../../../models/address'
import Contact from '../../../../models/contact'
import Consent from '../../../../models/consent'

const _getConsent = async (req, { program, type, id }) => {

  const consent = await Consent.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', program.get('id'))
    qb.where(type, id)
  }).fetch({
    transacting: req.trx
  })

  if(consent) return consent

  const code = await generateCode(req, {
    table: 'crm_consents'
  })

  return await await Consent.forge({
    team_id: req.team.get('id'),
    program_id: program.get('id'),
    [`${req.body.channel_type}_id`]: req.body.channel_id,
    code,
    optin_reason: req.body.optin_reason
  }).save(null, {
    transacting: req.trx
  })

}
const _getChannel = async (req, { type, id }) => {
  if(type === 'email_address') {
    return await EmailAddress.scope({
      team: req.team
    }).query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    }).then(result => result.get('address'))
  } else if(type === 'phone_number') {
    return await PhoneNumber.scope({
      team: req.team
    }).query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    }).then(result => result.get('number'))
  } else if(type === 'email_address') {
    return await Address.scope({
      team: req.team
    }).query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    }).then(result => result.get('address').description)
  }
}

const createRoute = async (req, res) => {

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

  const program = await Program.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  const consent = await _getConsent(req, {
    type: `${req.body.channel_type}_id`,
    id: req.body.channel_id,
    program
  })

  await consent.save({
    unsubscribed_at: null,
    optin_reason: req.body.optin_reason,
    optout_reason: null,
    optout_reason_other: null
  }, {
    transacting: req.trx
  })

  const channel = await _getChannel(req, {
    type: req.body.channel_type,
    id: req.body.channel_id
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

export default createRoute
