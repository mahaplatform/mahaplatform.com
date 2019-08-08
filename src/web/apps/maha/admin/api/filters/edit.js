import Filter from '../../../models/filter'

const editRoute = async (req, res) => {

  const filter = await Filter.scope({
    team: req.team
  }).query(qb => {
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

  res.status(200).respond(filter, (req, filter) => ({
    id: filter.get('id'),
    title: filter.get('title'),
    accesses: filter.related('accesses').map(access => ({
      id: access.get('id'),
      grouping: access.get('grouping'),
      group_id: access.get('group_id'),
      user_id: access.get('user_id')
    }))
  }))

}

export default editRoute
