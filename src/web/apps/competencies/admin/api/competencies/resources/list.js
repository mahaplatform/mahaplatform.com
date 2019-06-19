import ResourceSerializer from '../../../../serializers/resource_serializer'
import Resource from '../../../../models/resource'

const listRoute = async (req, res) => {

  const resources = await Resource.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')
    qb.where('competencies_competencies_resources.competency_id', req.params.competency_id)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['competency'],
    transacting: req.trx
  })

  res.status(200).respond(resources, ResourceSerializer)

}

export default listRoute
