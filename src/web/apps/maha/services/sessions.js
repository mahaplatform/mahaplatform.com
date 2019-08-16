import generateCode from '../../../core/utils/generate_code'
import { sendAlert } from '../services/alerts'
import socket from '../../../core/services/emitter'
import Session from '../models/session'
import moment from 'moment'

export const createSession = async (req, trx) => {

  const code = await generateCode(req, {
    table: 'maha_sessions'
  })

  const session = await Session.forge({
    team_id: req.team.get('id'),
    device_id: req.device.get('id'),
    user_id: req.user.get('id'),
    last_active_at: moment(),
    code
  }).save(null, {
    transacting: trx
  })

  await sendAlert(req, trx, req.user, 'maha:new_session', {
    first_name: req.user.get('first_name'),
    signin_at: moment().format('h:mm A'),
    icon: req.device.get('icon'),
    display_name: req.device.related('display_name').get('text'),
    terminate_url: `/so${session.get('code')}`
  })

  socket.in(`/admin/users/${req.user.get('id')}`).emit('message', {
    action: 'session'
  })

  return session

}
