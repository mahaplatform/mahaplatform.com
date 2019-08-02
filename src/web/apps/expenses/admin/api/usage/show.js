import knex from '../../../../../core/services/knex'
import UserTypes from '../../../../maha/models/user_type'
import Group from '../../../../maha/models/group'

const showRoute = async (req, res) => {

  const user_types = await UserTypes.query(qb => {
    qb.select(knex.raw('maha_user_types.id, text, count(maha_users.*) as members'))
    qb.innerJoin('maha_users','maha_users.user_type_id','maha_user_types.id')
    qb.where('maha_users.is_active', true)
    qb.groupByRaw('maha_user_types.id, text')
    qb.orderBy('maha_user_types.id', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  const groups = await Group.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('id, title, count(maha_users_groups.*) as members'))
    qb.innerJoin('maha_users_groups','maha_users_groups.group_id','maha_groups.id')
    qb.groupByRaw('id, title')
    qb.orderBy('title', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  const active = await knex('maha_users_groups')
    .select(knex.raw('group_id, count(maha_users.*) as active'))
    .innerJoin('maha_users','maha_users.id','maha_users_groups.user_id')
    .whereNotNull('maha_users.activated_at')
    .groupByRaw('group_id').then(result => {
      return result.reduce((active, group) => ({
        ...active,
        [group.group_id]: group.active
      }), {})
    })

  const items = await knex('maha_users_groups')
    .select(knex.raw('group_id, count(expenses_items.*) as items'))
    .innerJoin('expenses_items','expenses_items.user_id','maha_users_groups.user_id')
    .groupByRaw('group_id').then(result => {
      return result.reduce((active, group) => ({
        ...active,
        [group.group_id]: group.items
      }), {})
    })

  res.status(200).respond(user_types.map(user_type => ({
    id: user_type.get('id'),
    title: user_type.get('text'),
    members: user_type.get('members'),
    active: 100,
    items: 1020,
    groups: groups.map(group => ({
      title: group.get('title'),
      members: group.get('members'),
      active: active[group.get('id')],
      items: items[group.get('id')]
    }))
  })))

}

export default showRoute
