import OfferingSerializer from '../../../serializers/offering_serializer'
import Offering from '../../../models/offering'

const listRoute = async (req, res) => {

  const offerings = await Offering.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(offerings, (offering) => {
    return OfferingSerializer(req, req.trx, offering)
  })

}

export default listRoute
