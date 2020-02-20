import ClassificationSerializer from '../../../serializers/classification_serializer'
import Classification from '../../../models/classification'

const listRoute = async (req, res) => {

  const classifications = await Classification.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    searchParams: ['id','title'],
    sort: req.query.$sort,
    defaultSort: 'title'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(classifications, ClassificationSerializer)

}

export default listRoute
