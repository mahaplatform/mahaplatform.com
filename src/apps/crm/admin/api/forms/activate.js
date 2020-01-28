import FormSerializer from '../../../serializers/form_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Form from '../../../models/form'

const activateRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  await form.save({
    status: req.body.is_active ? 'active' : 'inactive'
  },{
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/crm/forms',
    `/admin/crm/forms/${form.get('id')}`
  ])

  res.status(200).respond(form, FormSerializer)

}

export default activateRoute
