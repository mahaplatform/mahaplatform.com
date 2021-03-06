import UndepositedSerializer from '@apps/finance/serializers/undeposited_serializer'
import Undeposited from '@apps/finance/models/undeposited'

const undepositedRoute = async (req, res) => {

  const undeposited = await Undeposited.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.orderByRaw('date desc, created_at desc')
  }).fetchAll({
    withRelated: ['invoice.customer'],
    transacting: req.trx
  })

  await res.status(200).respond(undeposited, UndepositedSerializer)

}

export default undepositedRoute
