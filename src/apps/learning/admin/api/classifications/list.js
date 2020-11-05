import ClassificationSerializer from '@apps/learning/serializers/classification_serializer'
import Classification from '@apps/learning/models/classification'

const listRoute = async (req, res) => {

  const classifications = await Classification.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['id','title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(classifications, ClassificationSerializer)

}

export default listRoute
