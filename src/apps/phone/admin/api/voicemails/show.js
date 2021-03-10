import VoicemailSerializer from '@apps/maha/serializers/voicemail_serializer'
import Voicemail from '@apps/maha/models/voicemail'

const showRoute = async (req, res) => {

  const voicemail = await Voicemail.query(qb => {
    qb.innerJoin('maha_calls','maha_calls.id','maha_voicemails.call_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=maha_calls.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('maha_voicemails.team_id', req.team.get('id'))
    qb.where('maha_calls.program_id', req.params.program_id)
    qb.where('maha_voicemails.id', req.params.id)
  }).fetch({
    withRelated: ['call.phone_number.contact.photo','asset'],
    transacting: req.trx
  })

  await res.status(200).respond(voicemail, VoicemailSerializer)

}

export default showRoute
