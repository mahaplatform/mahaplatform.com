import UserTypes from '../../../../maha/models/user_type'
import Group from '../../../../maha/models/group'

const showRoute = async (req, res) => {

  const user_types = await UserTypes.fetchAll({
    transacting: req.trx
  })

  const groups = await Group.fetchAll({
    transacting: req.trx
  })

  const user_type_members = await req.trx.raw(`
    select maha_users.user_type_id, count(maha_users.*) as count
    from maha_users
    where maha_users.is_active=true
    group by maha_users.user_type_id
    order by maha_users.user_type_id
  `).then(result => result.rows.reduce((items, item) => ({
    ...items,
    [item.user_type_id]: (items[item.user_type_id] || 0) + Number(item.count),
    total: (items.total || 0) + Number(item.count)
  }), {}))

  const user_type_active = await req.trx.raw(`
    select maha_users.user_type_id, count(maha_users.*) as count
    from (
    select maha_users.*
    from maha_users
    inner join expenses_items on expenses_items.user_id=maha_users.id
    where maha_users.is_active=true
    group by maha_users.id
    order by maha_users.id
    ) maha_users
    group by maha_users.user_type_id
    order by maha_users.user_type_id
  `).then(result => result.rows.reduce((items, item) => ({
    ...items,
    [item.user_type_id]: (items[item.user_type_id] || 0) + Number(item.count),
    total: (items.total || 0) + Number(item.count)
  }), {}))

  const user_type_items = await req.trx.raw(`
    select maha_users.user_type_id,count(expenses_items.id) as count
    from expenses_items
    inner join maha_users on maha_users.id=expenses_items.user_id
    where maha_users.is_active=true
    group by maha_users.user_type_id
  `).then(result => result.rows.reduce((items, item) => ({
    ...items,
    [item.user_type_id]: (items[item.user_type_id] || 0) + Number(item.count),
    total: (items.total || 0) + Number(item.count)
  }), {}))

  const group_members = await req.trx.raw(`
    select maha_users.user_type_id, maha_users_groups.group_id, count(maha_users.*) as count
    from maha_users
    left join maha_users_groups on maha_users_groups.user_id=maha_users.id
    where maha_users.is_active=true
    group by maha_users.user_type_id, maha_users_groups.group_id
    order by maha_users.user_type_id, maha_users_groups.group_id
  `).then(result => result.rows.reduce((items, item) => ({
    ...items,
    [`${item.user_type_id}-${item.group_id}`]: Number(item.count),
    [item.user_type_id]: (items[item.user_type_id] || 0) + Number(item.count)
  }), {}))

  const group_active = await req.trx.raw(`
    select maha_users.user_type_id, maha_users_groups.group_id, count(maha_users.*) as count
    from (
    select maha_users.*
    from maha_users
    inner join expenses_items on expenses_items.user_id=maha_users.id
    where maha_users.is_active=true
    group by maha_users.id
    order by maha_users.id
    ) maha_users
    left join maha_users_groups on maha_users_groups.user_id=maha_users.id
    group by maha_users.user_type_id, maha_users_groups.group_id
    order by maha_users.user_type_id, maha_users_groups.group_id
  `).then(result => result.rows.reduce((items, item) => ({
    ...items,
    [`${item.user_type_id}-${item.group_id}`]: Number(item.count),
    [item.user_type_id]: (items[item.user_type_id] || 0) + Number(item.count)
  }), {}))


  const group_items = await req.trx.raw(`
    select maha_users.user_type_id,maha_users_groups.group_id,count(expenses_items.id) as count
    from expenses_items
    inner join maha_users on maha_users.id=expenses_items.user_id
    left join maha_users_groups on maha_users_groups.user_id=expenses_items.user_id
    where maha_users.is_active=true
    group by maha_users.user_type_id,maha_users_groups.group_id
    order by maha_users.user_type_id,maha_users_groups.group_id
  `).then(result => result.rows.reduce((items, item) => ({
    ...items,
    [`${item.user_type_id}-${item.group_id}`]: Number(item.count),
    [item.user_type_id]: (items[item.user_type_id] || 0) + Number(item.count)
  }), {}))

  res.status(200).respond({
    user_types: [
      ...user_types.map(user_type => ({
        id: user_type.get('id'),
        title: user_type.get('text'),
        members: user_type_members[user_type.get('id')] || 0,
        active: user_type_active[user_type.get('id')] || 0,
        items: user_type_items[user_type.get('id')] || 0,
        groups: [
          ...groups.map(group => ({
            title: group.get('title'),
            members: group_members[`${user_type.get('id')}-${group.get('id')}`] || 0,
            active: group_active[`${user_type.get('id')}-${group.get('id')}`] || 0,
            items: group_items[`${user_type.get('id')}-${group.get('id')}`] || 0
          })),
          {
            title: 'Unaffiliated',
            members: group_members[`${user_type.get('id')}-null`] || 0,
            active: group_active[`${user_type.get('id')}-null`] || 0,
            items: group_items[`${user_type.get('id')}-null`] || 0
          }
        ]
      })),
      {
        id: 0,
        title: 'Unclassified',
        members: user_type_members['null'] || 0,
        active: user_type_active['null'] || 0,
        items: user_type_items['null'] || 0,
        groups: [
          ...groups.map(group => ({
            title: group.get('title'),
            members: group_members[`null-${group.get('id')}`] || 0,
            active: group_active[`null-${group.get('id')}`] || 0,
            items: group_items[`null-${group.get('id')}`] || 0
          })),
          {
            title: 'Unaffiliated',
            members: group_members['null-null'] || 0,
            active: group_active['null-null'] || 0,
            items: group_items['null-null'] || 0
          }
        ]
      }
    ],
    totals: {
      members: user_type_members.total || 0,
      active: user_type_active.total || 0,
      items: user_type_items.total
    }
  })

}

export default showRoute
