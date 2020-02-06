import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import FormSerializer from '../../../serializers/form_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { updateAlias } from '../../../../maha/services/aliases'
import Form from '../../../models/form'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  await form.save({
    ...whitelist(req.body, ['title','config'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await updateAlias(req, {
    src: _.get(req.body, 'config.seo.permalink'),
    destination: `/crm/forms/${form.get('code')}`
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
    '/admin/crm/forms',
    `/admin/crm/forms/${form.id}`
  ])

  res.status(200).respond(form, FormSerializer)

}

export default updateRoute
