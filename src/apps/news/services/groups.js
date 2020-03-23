import _ from 'lodash'

export const updateMembers = async (req, { group, members }) => {

  const current = await req.trx('news_members').where({
    news_group_id: group.get('id')
  })

  await Promise.map(members, async (member) => {

    const existing = _.find(current, {
      grouping_id: member.grouping_id,
      group_id: member.group_id,
      user_id: member.user_id
    })

    if(existing) return

    await req.trx('news_members').insert({
      team_id: req.team.get('id'),
      news_group_id: group.get('id'),
      grouping_id: member.grouping_id,
      group_id: member.group_id,
      user_id: member.user_id
    })

  })

  await Promise.map(current, async (member) => {

    const existing = _.find(members, {
      grouping_id: member.grouping_id,
      group_id: member.group_id,
      user_id: member.user_id
    })

    console.log(members, member)

    if(existing) return

    await req.trx('news_members').where({
      id: member.id
    }).delete()

  })

}
