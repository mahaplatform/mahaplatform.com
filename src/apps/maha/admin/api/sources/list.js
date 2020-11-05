import SourceSerializer from '@apps/maha/serializers/source_serializer'
import Source from '@apps/maha/models/source'

const listRoute = async (req, res) => {

  const sources = await Source.filterFetch({
    scope: qb => {
      qb.whereRaw('id > ?', 4)
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: 'id'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(sources, SourceSerializer)

}

export default listRoute
