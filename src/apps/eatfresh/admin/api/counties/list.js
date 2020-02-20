import CountySerializer from '../../../serializers/county_serializer'
import County from '../../../models/county'

const listRoute = async (req, res) => {

  const counties = await County.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['name']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'name',
      allowed: ['id','name']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(counties, CountySerializer)

}

export default listRoute
