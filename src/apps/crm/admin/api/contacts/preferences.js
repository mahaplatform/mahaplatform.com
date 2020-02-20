import Program from '../../../models/program'
import Contact from '../../../models/contact'
import Topic from '../../../models/topic'

const preferencesRoute = async (req, res) => {

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

  const email_addresses = await req.trx('crm_email_addresses')
    .select(req.trx.raw('crm_email_addresses.*,crm_channels.program_id,crm_channels.has_consented'))
    .innerJoin('crm_channels','crm_channels.email_address_id','crm_email_addresses.id')
    .where('crm_channels.contact_id', contact.get('id'))

  const phone_numbers = await req.trx('crm_phone_numbers')
    .select(req.trx.raw('crm_phone_numbers.*,crm_channels.program_id,crm_channels.has_consented'))
    .innerJoin('crm_channels','crm_channels.phone_number_id','crm_phone_numbers.id')
    .where('crm_channels.contact_id', contact.get('id'))

  const addresses = await req.trx('crm_addresses')
    .select(req.trx.raw('crm_addresses.*,crm_channels.program_id,crm_channels.has_consented'))
    .innerJoin('crm_channels','crm_channels.address_id','crm_addresses.id')
    .where('crm_channels.contact_id', contact.get('id'))

  const topics = await Topic.query(qb => {
    qb.select(req.trx.raw('crm_topics.*, crm_interests.topic_id is not null as is_interested'))
    qb.joinRaw('left join crm_interests on crm_interests.topic_id=crm_topics.id and crm_interests.contact_id=?', contact.get('id'))
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const programs = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.toArray())

  const consent = programs.map(program => ({
    title: program.get('title'),
    logo: program.get('logo_id') ? program.related('logo').get('path') : req.team.related('logo').get('path'),
    channels: [
      ...email_addresses.filter(email_address => {
        return email_address.program_id === program.get('id')
      }).map(email_address => {
        return { type: 'email_address', label: email_address.address, has_consented: email_address.has_consented }
      }),
      ...phone_numbers.filter(phone_number => {
        return phone_number.program_id === program.get('id')
      }).map(phone_number => {
        return { type: 'phone_number', label: phone_number.number, has_consented: phone_number.has_consented }
      }),
      ...addresses.filter(address => {
        return address.program_id === program.get('id')
      }).map(address => {
        return { type: 'address', label: address.address.description, has_consented: address.has_consented }
      })
    ],
    topics: topics.filter(topic => {
      return topic.get('program_id') === program.get('id')
    }).map(topic => {
      return { title: topic.get('title'), is_interested: topic.get('is_interested') }
    })
  }))

  res.status(200).respond({ consent })

}

export default preferencesRoute
