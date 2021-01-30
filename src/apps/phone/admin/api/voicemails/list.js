import VoicemailSerializer from '@apps/phone/serializers/voicemail_serializer'
import Voicemail from '@apps/maha/models/voicemail'

const listRoute = async (req, res) => {

  const voicemails = await Voicemail.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_calls','maha_calls.id','maha_voicemails.call_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=maha_calls.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('maha_voicemails.team_id', req.team.get('id'))
      qb.where('maha_calls.program_id', req.params.program_id)
      qb.whereNull('maha_voicemails.deleted_at')
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['id','first_name','last_name','email']
    },
    page: req.query.$page,
    withRelated: ['call.phone_number.contact.photo','asset'],
    transacting: req.trx
  })

  res.status(200).respond(voicemails, VoicemailSerializer)

}

export default listRoute
