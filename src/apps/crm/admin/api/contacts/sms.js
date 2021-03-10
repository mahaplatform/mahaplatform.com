import FromPhoneNumber from '@apps/maha/models/phone_number'
import { sendSMS } from '@apps/maha/services/smses'
import ToPhoneNumber from '@apps/crm/models/phone_number'
import Contact from '@apps/crm/models/contact'

const smsRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const to = await ToPhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
    qb.where('id', req.body.to_number_id)
  }).fetch({
    transacting: req.trx
  })

  if(!to) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  const from = await FromPhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
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

  await res.status(200).respond(true)

}

export default smsRoute
