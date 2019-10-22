import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import ProgramSerializer from '../../../serializers/program_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'
import ProgramAccess from '../../../models/program_access'
import Program from '../../../models/program'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_programs'
  })

  const program = await Program.forge({
    team_id: req.team.get('id'),
    code,
    has_email_channel: _.includes(req.body.channels, 'email'),
    has_sms_channel: _.includes(req.body.channels, 'sms'),
    has_voice_channel: _.includes(req.body.channels, 'voice'),
    has_mail_channel: _.includes(req.body.channels, 'mail'),
    ...whitelist(req.body, ['logo_id','title'])
  }).save(null, {
    transacting: req.trx
  })

  await ProgramAccess.forge({
    team_id: req.team.get('id'),
    program_id: program.get('id'),
    grouping_id: 1,
    type: 'view'
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: program
  })

  await socket.refresh(req, [
    '/admin/crm/programs'
  ])

  res.status(200).respond(program, ProgramSerializer)

}

export default createRoute
