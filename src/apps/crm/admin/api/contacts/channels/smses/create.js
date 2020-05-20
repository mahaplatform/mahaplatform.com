import { sendSMS } from '../../../../../../maha/services/smses'
import PhoneNumber from '../../../../../models/phone_number'
import Program from '../../../../../models/program'
import Contact from '../../../../../models/contact'

const createRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.contact_id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const program = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  const to = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const sms = await sendSMS(req, {
    from: program.related('phone_number').get('number'),
    to: to.get('number'),
    body: req.body.body,
    asset_ids: req.body.asset_ids,
    queue: false
  })

  await sms.save({
    program_id: program.get('id'),
    phone_number_id: to.get('id')
  }, {
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default createRoute
