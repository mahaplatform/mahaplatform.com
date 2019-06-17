import CountySerializer from '../../../serializers/county_serializer'
import County from '../../../models/county'

const showRoute = async (req, res) => {

  const county = await County.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!county) return res.status(404).respond({
    code: 404,
    message: 'Unable to load county'
  })

  res.status(200).respond(county, CountySerializer)

}

export default showRoute
