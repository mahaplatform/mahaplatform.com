import knex from '../../../../../core/services/knex'
import UserTypes from '../../../../maha/models/user_type'
import Group from '../../../../maha/models/group'

const showRoute = async (req, res) => {

  const user_types = await UserTypes.fetchAll({
    transacting: req.trx
  })

  const groups = await Group.fetchAll({
    transacting: req.trx
  })

  const members = await req.trx.raw(`
    select maha_users.user_type_id, maha_users_groups.group_id, count(maha_users.*) as members
    from maha_users
    left join maha_users_groups on maha_users_groups.user_id=maha_users.id
    group by maha_users.user_type_id, maha_users_groups.group_id
    order by maha_users.user_type_id, maha_users_groups.group_id
  `).then(result => result.rows.reduce((members, item) => ({
    ...members,
    [`${item.user_type_id}-${item.group_id}`]: Number(item.members),
    [item.user_type_id]: (members[item.user_type_id] || 0) + Number(item.members),
    total: (members.total || 0) + Number(item.members)
  }), {}))

  const active = await req.trx.raw(`
    select maha_users.user_type_id, maha_users_groups.group_id, count(maha_users.*) as active
    from (
    select maha_users.*
    from maha_users
    inner join expenses_items on expenses_items.user_id=maha_users.id
    group by maha_users.id
    order by maha_users.id
    ) maha_users
    left join maha_users_groups on maha_users_groups.user_id=maha_users.id
    group by maha_users.user_type_id, maha_users_groups.group_id
    order by maha_users.user_type_id, maha_users_groups.group_id
  `).then(result => result.rows.reduce((active, item) => ({
    ...active,
    [`${item.user_type_id}-${item.group_id}`]: Number(item.active),
    [item.user_type_id]: (active[item.user_type_id] || 0) + Number(item.active),
    total: (active.total || 0) + Number(item.active)
  }), {}))

  const items = await knex('expenses_items').transacting(req.trx)
    .select(knex.raw('maha_users.user_type_id, maha_users_groups.group_id, count(expenses_items.*) as items'))
    .innerJoin('maha_users','maha_users.id','expenses_items.user_id')
    .innerJoin('maha_users_groups','maha_users_groups.user_id','maha_users.id')
    .where('maha_users.is_active', true)
    .groupByRaw('maha_users.user_type_id, maha_users_groups.group_id')
    .orderByRaw('maha_users.user_type_id, maha_users_groups.group_id')
    .then(result => result.reduce((items, item) => ({
      ...items,
      [`${item.user_type_id}-${item.group_id}`]: Number(item.items),
      [item.user_type_id]: (items[item.user_type_id] || 0) + Number(item.items),
      total: (items.total || 0) + Number(item.items)
    }), {}))

  res.status(200).respond({
    user_types: [
      ...user_types.map(user_type => ({
        id: user_type.get('id'),
        title: user_type.get('text'),
        members: members[user_type.get('id')] || 0,
        active: active[user_type.get('id')] || 0,
        items: items[user_type.get('id')] || 0,
        groups: [
          ...groups.map(group => ({
            title: group.get('title'),
            members: members[`${user_type.get('id')}-${group.get('id')}`] || 0,
            active: active[`${user_type.get('id')}-${group.get('id')}`] || 0,
            items: items[`${user_type.get('id')}-${group.get('id')}`] || 0
          })),
          {
            title: 'Unaffiliated',
            members: members[`${user_type.get('id')}-null`] || 0,
            active: active[`${user_type.get('id')}-null`] || 0,
            items: items[`${user_type.get('id')}-null`] || 0
          }
        ]
      })),
      {
        id: 0,
        title: 'Unclassified',
        members: members['null'] || 0,
        active: active['null'] || 0,
        items: items['null'] || 0,
        groups: [
          ...groups.map(group => ({
            title: group.get('title'),
            members: members[`null-${group.get('id')}`] || 0,
            active: active[`null-${group.get('id')}`] || 0,
            items: items[`null-${group.get('id')}`] || 0
          })),
          {
            title: 'Unaffiliated',
            members: members['null-null'] || 0,
            active: active['null-null'] || 0,
            items: items['null-null'] || 0
          }
        ]
      }
    ],
    totals: {
      members: members.total || 0,
      active: active.total || 0,
      items: items.total
    }
  })

}

export default showRoute
