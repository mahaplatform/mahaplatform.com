import Voicemail from '@apps/maha/models/voicemail'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

const heardRoute = async (req, res) => {

  const voicemail = await Voicemail.query(qb => {
    qb.innerJoin('maha_calls','maha_calls.id','maha_voicemails.call_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=maha_calls.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('maha_voicemails.team_id', req.team.get('id'))
    qb.where('maha_calls.program_id', req.params.program_id)
    qb.where('maha_voicemails.id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await voicemail.save({
    was_heard: true
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'marked heard',
    auditable: voicemail
  })

  await socket.refresh(req, [
    '/admin/phone/voicemails',
    `/admin/phone/voicemails/${req.params.id}`
  ])

  res.status(200).respond(true)

}

export default heardRoute
