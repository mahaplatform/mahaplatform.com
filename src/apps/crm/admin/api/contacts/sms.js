import SMSSerializer from '../../../serializers/sms_serializer'
import SendSMSQueue from '../../../queues/send_sms_queue'
import PhoneNumber from '../../../models/phone_number'
import Contact from '../../../models/contact'
import Number from '../../../models/number'
import SMS from '../../../models/sms'

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

  const sms = await SMS.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    phone_number_id: phone_number.get('id'),
    number_id: number.get('id'),
    type: 'outgoing',
    body: req.body.body
  }).save({}, {
    transacting: req.trx
  })

  await SendSMSQueue.enqueue(req, {
    id: sms.get('id')
  })

  res.status(200).respond(sms, SMSSerializer)

}

export default smsRoute
