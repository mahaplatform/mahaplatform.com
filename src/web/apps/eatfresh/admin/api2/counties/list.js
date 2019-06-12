import CountySerializer from '../../../serializers/county_serializer'
import County from '../../../models/county'

const listRoute = async (req, res) => {

  const counties = await County.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['name']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'name',
    sortParams: ['id','name']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(counties, (county) => {
    return CountySerializer(req, req.trx, county)
  })

}

export default listRoute
