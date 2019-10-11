import PhoneNumber from '../../../models/phone_number'
import Contact from '../../../models/contact'
import Number from '../../../models/number'
import twilio from '../../../../../core/services/twilio'

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

  twilio.calls.create({
    machineDetection: 'DetectMessageEnd',
    from: number.get('number'),
    to: phone_number.get('number'),
    url: `${process.env.TWIML_HOST}/crm/voice`
  })


  res.status(200).respond(true)

}

export default smsRoute
