import { createConfirmationWorkflow } from '@apps/automation/services/workflows'
import StoreSerializer from '@apps/stores/serializers/store_serializer'
import { activity } from '@core/services/routes/activities'
import { updateAlias } from '@apps/maha/services/aliases'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Program from '@apps/crm/models/program'
import Store from '@apps/stores/models/store'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', ['manage','edit'])
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const code = await generateCode(req, {
    table: 'stores_stores'
  })

  const store = await Store.forge({
    team_id: req.team.get('id'),
    code,
    program_id: program.get('id'),
    ...whitelist(req.body, ['title','permalink','contact_config'])
  }).save(null, {
    transacting: req.trx
  })

  await updateAlias(req, {
    permalink: req.body.permalink,
    src: `/stores/${req.body.permalink}`,
    destination: `/stores/stores/${store.get('code')}`
  })

  await audit(req, {
    story: 'created',
    auditable: store
  })

  await createConfirmationWorkflow(req,  {
    store,
    trigger_type: 'order_created',
    program_id: program.get('id'),
    ...req.body.confirmation
  })

  await activity(req, {
    story: 'created {object}',
    object: store
  })

  await socket.refresh(req, [
    '/admin/stores/stores'
  ])

  res.status(200).respond(store, StoreSerializer)

}

export default createRoute
