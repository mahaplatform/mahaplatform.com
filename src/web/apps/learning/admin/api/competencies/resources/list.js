import ResourceSerializer from '../../../../serializers/resource_serializer'
import knex from '../../../../../../core/services/knex'
import Resource from '../../../../models/resource'

const listRoute = async (req, res) => {

  const resources = await Resource.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('distinct on (competencies_resources.id) competencies_resources.*'))
    qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')
    qb.where('competencies_competencies_resources.competency_id', req.params.competency_id)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['competencies'],
    transacting: req.trx
  })

  res.status(200).respond(resources, ResourceSerializer)

}

export default listRoute
