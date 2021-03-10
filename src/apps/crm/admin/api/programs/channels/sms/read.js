import socket from '@core/services/routes/emitter'
import ChannelView from '@apps/crm/models/channel_view'
import Program from '@apps/crm/models/program'
import moment from 'moment'

const readRoute = async (req, res) => {

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

  const view =   await ChannelView.fetchOrCreate({
    team_id: req.team.get('id'),
    phone_number_id: req.params.id,
    type: 'sms'
  }, {
    transacting: req.trx
  })

  await view.save({
    last_viewed_at: moment()
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${program.get('id')}/channels/sms`
  ])

  await res.status(200).respond(true)

}

export default readRoute
