import AttractionSerializer from '@apps/eatfresh/serializers/attraction_serializer'
import Attraction from '@apps/eatfresh/models/attraction'

const showRoute = async (req, res) => {

  const attraction = await Attraction.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('is_approved', true)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['county','photo','photos.asset','offerings.photo','categories.photo'],
    transacting: req.trx
  })

  if(!attraction) return res.status(404).respond({
    code: 404,
    message: 'Unable to load attraction'
  })

  res.status(200).respond(attraction, AttractionSerializer)

}

export default showRoute
