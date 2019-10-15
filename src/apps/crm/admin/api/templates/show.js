import TemplateSerializer from '../../../serializers/template_serializer'
import Template from '../../../models/template'

const showRoute = async (req, res) => {

  const template = await Template.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!template) return res.status(404).respond({
    code: 404,
    message: 'Unable to load template'
  })

  res.status(200).respond(template, TemplateSerializer)

}

export default showRoute
