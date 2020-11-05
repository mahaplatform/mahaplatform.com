import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import FormSerializer from '@apps/forms/serializers/form_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { updateAlias } from '@apps/maha/services/aliases'
import Form from '@apps/forms/models/form'

const updateRoute = async (req, res) => {

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

  await form.save({
    ...whitelist(req.body, ['title','permalink','config'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await updateAlias(req, {
    permalink: req.body.permalink,
    src: `/forms/${req.body.permalink}`,
    destination: `/forms/forms/${form.get('code')}`
  })

  await audit(req, {
    story: 'updated',
    auditable: form
  })

  await activity(req, {
    story: 'updated {object}',
    object: form
  })

  await socket.refresh(req, [
    '/admin/forms/forms',
    `/admin/forms/forms/${form.id}`
  ])

  res.status(200).respond(form, FormSerializer)

}

export default updateRoute
