import Program from '../../../models/program'
import Contact from '../../../models/contact'
import List from '../../../models/list'

const subscriptionsRoute = async (req, res) => {

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

  const lists = await List.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.select(req.trx.raw('crm_lists.*, crm_subscriptions.list_id is not null as is_subscribed'))
    qb.joinRaw('left join crm_subscriptions on crm_subscriptions.list_id=crm_lists.id and crm_subscriptions.contact_id=?', contact.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const programs = await Program.scope(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.toArray())

  const data = programs.map(program => ({
    id: program.get('id'),
    title: program.get('title'),
    logo: program.get('logo_id') ? program.related('logo').get('path') : req.team.related('logo').get('path'),
    lists: lists.filter(list => {
      return list.get('program_id') === program.get('id')
    }).map(list => {
      return { title: list.get('title'), is_subscribed: list.get('is_subscribed') }
    })
  }))

  res.status(200).respond(data)

}

export default subscriptionsRoute
