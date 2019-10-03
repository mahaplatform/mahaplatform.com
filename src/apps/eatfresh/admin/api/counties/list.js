import CountySerializer from '../../../serializers/county_serializer'
import County from '../../../models/county'

const listRoute = async (req, res) => {

  const counties = await County.scope({
    team: req.team
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

  res.status(200).respond(counties, CountySerializer)

}

export default listRoute
