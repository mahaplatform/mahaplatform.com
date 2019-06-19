import ResourceSerializer from '../../../serializers/resource_serializer'
import Resource from '../../../models/resource'

const listRoute = async (req, res) => {

  const resources = await Resource.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    filterParams: ['competencies_competencies.id','competencies_expectations.classification_id','competencies_competencies.level'],
    searchParams: ['title','description','url']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset.user.photo','asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(resources, ResourceSerializer)

}

export default listRoute
