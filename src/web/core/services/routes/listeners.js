import Listening from '../../../apps/maha/models/listening'
import _ from 'lodash'

export const listeners = async (req, listener) => {

  const active_listener_ids = await Listening.where({
    team_id: listener.team_id,
    listenable_type: listener.listenable_type,
    listenable_id: listener.listenable_id
  }).fetchAll({
    transacting: req.trx
  }).then(listeners => listeners.map(listener => {
    return listener.get('user_id')
  }))

  if(_.includes(active_listener_ids, listener.user_id)) return

  await Listening.forge({
    team_id: listener.team_id,
    user_id: listener.user_id,
    listenable_type: listener.listenable_type,
    listenable_id: listener.listenable_id
  }).save(null, {
    transacting: req.trx
  })

}
