import Listening from '@apps/maha/models/listening'
import _ from 'lodash'

export const listeners = async (req, listeners) => {

  await Promise.map(_.castArray(listeners), async listener => {

    const listenable = _getListenable(listener)

    await Listening.fetchOrCreate({
      team_id: req.team.get('id'),
      user_id: listener.user_id,
      listenable_type: listenable.type,
      listenable_id: listenable.id
    }, {
      transacting: req.trx
    })

  })

}

const _getListenable = (entry) => ({
  type: entry.listenable_type || entry.listenable.tableName,
  id: entry.listenable_id || entry.listenable.id || entry.listenable.get('id')
})
