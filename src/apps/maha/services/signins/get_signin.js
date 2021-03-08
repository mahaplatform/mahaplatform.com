import generateCode from '@core/utils/generate_code'
// import { sendAlert } from '../services/alerts'
import Signin from '@apps/maha/models/signin'
import socket from '@core/vendor/emitter'
import moment from 'moment'

const getSignin = async (req, { account, device }) => {

  const signin = await Signin.where({
    account_id: account.get('id'),
    device_id: device.get('id')
  }).fetch({
    transacting: req.trx
  })

  if(signin) return signin

  const code = await generateCode(req, {
    table: 'maha_signins'
  })

  const newsignin = await Signin.forge({
    device_id: device.get('id'),
    account_id: account.get('id'),
    is_active: true,
    code,
    last_active_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  // await sendAlert(req, req.user, 'maha:new_signin', {
  //   first_name: req.user.get('first_name'),
  //   signin_at: moment().format('h:mm A'),
  //   icon: req.device.get('icon'),
  //   display_name: req.device.related('display_name').get('text'),
  //   terminate_url: `/so${signin.get('code')}`
  // })

  socket.in(`/admin/users/${req.user.get('id')}`).emit('message', {
    action: 'signin'
  })

  return newsignin

}

export default getSignin
