import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import FormSerializer from '../../../../serializers/form_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import Form from '../../../../models/form'

const createRoute = async (req, res) => {

  const form = await Form.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    ...whitelist(req.body, ['title'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: form
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}/forms`
  ])

  res.status(200).respond(form, FormSerializer)

}

export default createRoute
