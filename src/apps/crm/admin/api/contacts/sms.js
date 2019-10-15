import FromPhoneNumber from '../../../../maha/models/phone_number'
import { sendSMS } from '../../../../maha/services/smses'
import ToPhoneNumber from '../../../models/phone_number'
import Contact from '../../../models/contact'

const smsRoute = async (req, res) => {

  const contact = await Contact.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const to = await ToPhoneNumber.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('id', req.body.to_number_id)
  }).fetch({
    transacting: req.trx
  })

  if(!to) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  const from = await FromPhoneNumber.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.body.from_number_id)
  }).fetch({
    transacting: req.trx
  })

  if(!from) return res.status(404).respond({
    code: 404,
    message: 'Unable to load number'
  })

  await sendSMS(req, {
    from: from.get('number'),
    to: to.get('number'),
    body: req.body.body,
    asset_ids: req.body.asset_ids
  })

  res.status(200).respond(true)

}

export default smsRoute
