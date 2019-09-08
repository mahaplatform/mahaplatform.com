import EmailAddress from '../../../models/email_address'
import PhoneNumber from '../../../models/phone_number'
import Program from '../../../../maha/models/program'
import Contact from '../../../models/contact'
import Topic from '../../../models/topic'

const preferencesRoute = async (req, res) => {

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

  const email_addresses = await EmailAddress.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('crm_email_addresses.*, crm_consents.id is not null as has_consented'))
    qb.joinRaw('left join crm_consents on crm_consents.email_address_id=crm_email_addresses.id')
    qb.where('contact_id', contact.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const phone_numbers = await PhoneNumber.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('crm_phone_numbers.*, crm_consents.id is not null as has_consented'))
    qb.joinRaw('left join crm_consents on crm_consents.phone_number_id=crm_phone_numbers.id')
    qb.where('contact_id', contact.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const topics = await Topic.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('crm_topics.*, crm_interests.topic_id is not null as is_interested'))
    qb.joinRaw('left join crm_interests on crm_interests.topic_id=crm_topics.id and crm_interests.contact_id=?', contact.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const programs = await Program.scope({
    team: req.team
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const data = programs.map(program => ({
    title: program.get('title'),
    logo: '/assets/1/cornell.jpg',
    channels: [
      { type: 'address', label: '322 S Geneva St, Ithaca NY 14850', has_consented: false },
      { type: 'address', label: '615 Willow Ave, Ithaca NY 14850', has_consented: false },
      ...email_addresses.map(email_address => {
        return { type: 'email_address', label: email_address.get('address'), has_consented: email_address.get('has_consented') }
      }),
      ...phone_numbers.map(phone_number => {
        return { type: 'phone_number', label: phone_number.get('number'), has_consented: phone_number.get('has_consented') }
      })
    ],
    topics: topics.filter(topic => {
      return topic.get('program_id') === program.get('id')
    }).map(topic => {
      return { title: topic.get('title'), is_interested: topic.get('is_interested') }
    })
  }))

  res.status(200).respond(data)

}

export default preferencesRoute
