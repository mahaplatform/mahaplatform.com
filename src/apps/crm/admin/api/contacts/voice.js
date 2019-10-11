import MakeCallQueue from '../../../../maha/queues/make_call_queue'
import twilio from '../../../../../core/services/twilio'
import PhoneNumber from '../../../models/phone_number'
import Number from '../../../../maha/models/number'
import Call from '../../../../maha/models/call'
import Contact from '../../../models/contact'

const smsRoute = async (req, res) => {

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

  const phone_number = await PhoneNumber.scope({
    team: req.team
  }).query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('id', req.body.phone_number_id)
  }).fetch({
    transacting: req.trx
  })

  if(!phone_number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  const number = await Number.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.body.number_id)
  }).fetch({
    transacting: req.trx
  })

  if(!number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load number'
  })

  const call = await Call.forge({
    team_id: req.team.get('id'),
    phone_number_id: phone_number.get('id'),
    number_id: number.get('id'),
    type: 'outgoing'
  }).save({}, {
    transacting: req.trx
  })

  MakeCallQueue.enqueue(req, {
    id: call.get('id')
  })

  res.status(200).respond(true)

}

export default smsRoute
