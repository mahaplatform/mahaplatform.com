import TextSerializer from '../../../serializers/text_serializer'
import SendTextQueue from '../../../queues/send_text_queue'
import PhoneNumber from '../../../models/phone_number'
import Contact from '../../../models/contact'
import Number from '../../../models/number'
import Text from '../../../models/text'

const textRoute = async (req, res) => {

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

  const text = await Text.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    phone_number_id: phone_number.get('id'),
    number_id: number.get('id'),
    type: 'outgoing',
    body: req.body.body
  }).save({}, {
    transacting: req.trx
  })

  await SendTextQueue.enqueue(req, {
    id: text.get('id')
  })

  res.status(200).respond(text, TextSerializer)

}

export default textRoute
