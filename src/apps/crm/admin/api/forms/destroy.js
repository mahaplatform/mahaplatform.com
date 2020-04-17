import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import { deleteForm } from '../../../services/forms'
import Form from '../../../models/form'

const destroyRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  await deleteForm(req, {
    form
  })

  await activity(req, {
    story: 'deleted {object}',
    object: form
  })

  await socket.refresh(req, [
    '/admin/crm/forms',
    `/admin/crm/forms/${form.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
