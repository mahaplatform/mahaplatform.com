import { activity } from '../../../../../core/services/routes/activities'
import ProgramSerializer from '../../../serializers/program_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Program from '../../../../maha/models/program'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const program = await Program.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  await program.save({
    has_email_channel: _.includes(req.body.channels, 'email'),
    has_sms_channel: _.includes(req.body.channels, 'sms'),
    has_voice_channel: _.includes(req.body.channels, 'voice'),
    has_mail_channel: _.includes(req.body.channels, 'mail'),
    ...whitelist(req.body, ['title','leader_id'])
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: program
  })

  await socket.refresh(req, [
    '/admin/team/programs',
    `/admin/team/programs/${program.get('id')}`
  ])

  res.status(200).respond(program, ProgramSerializer)

}

export default updateRoute
