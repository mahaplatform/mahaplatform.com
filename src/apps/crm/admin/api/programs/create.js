import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import ProgramSerializer from '@apps/crm/serializers/program_serializer'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import ProgramAccess from '@apps/crm/models/program_access'
import Program from '@apps/crm/models/program'
import Sender from '@apps/crm/models/sender'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_programs'
  })

  const program = await Program.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['logo_id','title','phone_number_id','address','bank_id'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.manager_ids) {
    await Promise.map(req.body.manager_ids, async(user_id) => {
      await ProgramAccess.forge({
        team_id: req.team.get('id'),
        program_id: program.get('id'),
        user_id,
        type: 'manage'
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(req.body.visibility === 'public') {
    await ProgramAccess.forge({
      team_id: req.team.get('id'),
      program_id: program.get('id'),
      grouping_id: 1,
      type: 'view'
    }).save(null, {
      transacting: req.trx
    })
  }

  await Sender.forge({
    team_id: req.team.get('id'),
    program_id: program.get('id'),
    name: program.get('title'),
    email: `${program.get('title').replace(/\s*/g,'').toLowerCase()}-${req.team.get('subdomain')}@${process.env.DOMAIN}`
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: program
  })

  await activity(req, {
    story: 'created {object}',
    object: program
  })

  await socket.refresh(req, [
    '/admin/crm/programs'
  ])

  await res.status(200).respond(program, ProgramSerializer)

}

export default createRoute
