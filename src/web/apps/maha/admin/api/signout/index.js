import Session from '../../../models/session'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx) => {

  const session = await Session.where({
    device_id: req.device.get('id'),
    user_id: req.user.get('id')
  }).fetch({ transacting: trx })

  session.save({
    is_active: false
  }, { patch: true, transacting: trx })

  return {
    team_id: req.team.get('id')
  }

}

const signoutRoute = new Route({
  method: 'delete',
  path: '/session',
  processor
})

export default signoutRoute
