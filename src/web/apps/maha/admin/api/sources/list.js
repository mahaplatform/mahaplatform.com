import SourceSerializer from '../../../serializers/source_serializer'
import Source from '../../../models/source'

const listRoute = async (req, res) => {

  const sources = await Source.query(qb => {
    qb.whereRaw('id > ?', 4)
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'id'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(sources, SourceSerializer)

}

export default listRoute
