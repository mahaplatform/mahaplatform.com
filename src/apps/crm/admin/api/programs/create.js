import { activity } from '../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../web/core/services/routes/params'
import ProgramSerializer from '../../../serializers/program_serializer'
import generateCode from '../../../../../web/core/utils/generate_code'
import socket from '../../../../../web/core/services/routes/emitter'
import Program from '../../../models/program'
import moment from 'moment'
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
    ...whitelist(req.body, ['logo_id','is_private','title'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.accesses) {
    await Promise.map(req.body.accesses, async access => {
      await req.trx('crm_program_accesses').insert({
        team_id: req.team.get('id'),
        program_id: program.get('id'),
        grouping_id: access.grouping_id,
        group_id: access.group_id,
        user_id: access.user_id,
        created_at: moment(),
        updated_at: moment()
      })
    })
  }

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
