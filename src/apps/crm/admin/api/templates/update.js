import TemplateSerializer from '../../../serializers/template_serializer'
import Template from '../../../models/template'

const updateRoute = async (req, res) => {

  const template = await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!template) return res.status(404).respond({
    code: 404,
    message: 'Unable to load template'
  })

  await template.save({
    config: req.body.config
  }, {
    transacting: req.trx
  })

  res.status(200).respond(template, TemplateSerializer)

}

export default updateRoute
