import ClassificationSerializer from '../../../serializers/classification_serializer'
import Classification from '../../../models/classification'

const listRoute = async (req, res) => {

  const classifications = await Classification.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['id','title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(classifications, ClassificationSerializer)

}

export default listRoute
