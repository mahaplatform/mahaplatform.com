import ResourceSerializer from '../../../serializers/resource_serializer'
import Resource from '../../../models/resource'

const listRoute = async (req, res) => {

  const resources = await Resource.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (competencies_resources.id, competencies_resources.title) competencies_resources.*'))
      qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')
      qb.innerJoin('competencies_competencies', 'competencies_competencies.id', 'competencies_competencies_resources.competency_id')
      qb.innerJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies.id')
      qb.where('competencies_resources.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['competencies_competencies.id','competencies_expectations.classification_id','competencies_competencies.level'],
      search: ['competencies_resources.title','competencies_resources.description','competencies_resources.url']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title'
    },
    page: req.query.$page,
    withRelated: ['asset.user.photo','asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(resources, ResourceSerializer)

}

export default listRoute
