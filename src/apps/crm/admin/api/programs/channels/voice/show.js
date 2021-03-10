import ChannelSerializer from '@apps/crm/serializers/channel_serializer'
import Program from '@apps/crm/models/program'
import Channel from '@apps/crm/models/channel'

const showRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  const channel = await Channel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program.get('id'))
    qb.where('phone_number_id', req.params.id)
    qb.where('type', 'voice')
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  await res.status(200).respond(channel, ChannelSerializer)

}

export default showRoute
