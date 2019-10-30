import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import FormSerializer from '../../../serializers/form_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Form from '../../../models/form'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_forms'
  })

  const form = await Form.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['program_id','title'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: form
  })

  await socket.refresh(req, [
    '/admin/crm/forms'
  ])

  res.status(200).respond(form, FormSerializer)

}

export default createRoute
