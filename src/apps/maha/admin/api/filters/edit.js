import Filter from '@apps/maha/models/filter'

const editRoute = async (req, res) => {

  const filter = await Filter.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('owner_id', req.user.get('id'))
    qb.where('code', req.params.code)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['accesses'],
    transacting: req.trx
  })

  if(!filter) return res.status(404).respond({
    code: 404,
    message: 'Unable to load filter'
  })

  await res.status(200).respond(filter, (req, filter) => ({
    id: filter.get('id'),
    title: filter.get('title'),
    accesses: filter.related('accesses').map(access => ({
      id: access.get('id'),
      grouping_id: access.get('grouping_id'),
      group_id: access.get('group_id'),
      user_id: access.get('user_id')
    }))
  }))

}

export default editRoute
