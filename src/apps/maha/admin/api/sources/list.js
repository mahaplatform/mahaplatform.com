import SourceSerializer from '../../../serializers/source_serializer'
import Source from '../../../models/source'

const listRoute = async (req, res) => {

  const sources = await Source.filter({
    scope: qb => {
      qb.whereRaw('id > ?', 4)
    },
    filter: req.query.$filter,
    sort: req.query.$sort,
    defaultSort: 'id'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(sources, SourceSerializer)

}

export default listRoute
