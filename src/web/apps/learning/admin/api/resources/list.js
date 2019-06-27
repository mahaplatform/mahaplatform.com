import ResourceSerializer from '../../../serializers/resource_serializer'
import knex from '../../../../../core/services/knex'
import Resource from '../../../models/resource'

const listRoute = async (req, res) => {

  const resources = await Resource.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('distinct on (competencies_resources.id, competencies_resources.title) competencies_resources.*'))
    qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')
    qb.innerJoin('competencies_competencies', 'competencies_competencies.id', 'competencies_competencies_resources.competency_id')
    qb.innerJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies.id')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['competencies_competencies.id','competencies_expectations.classification_id','competencies_competencies.level'],
    searchParams: ['competencies_resources.title','competencies_resources.description','competencies_resources.url']
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
