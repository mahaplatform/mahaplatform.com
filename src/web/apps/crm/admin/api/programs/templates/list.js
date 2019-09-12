import TemplateSerializer from '../../../../serializers/template_serializer'
import Template from '../../../../models/template'

const listRoute = async (req, res) => {

  const templates = await Template.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', req.params.program_id)
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(templates, TemplateSerializer)

}

export default listRoute
