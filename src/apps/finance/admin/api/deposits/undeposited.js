import UndepositedSerializer from '../../../serializers/undeposited_serializer'
import Undeposited from '../../../models/undeposited'

const undepositedRoute = async (req, res) => {

  const undeposited = await Undeposited.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.orderByRaw('date desc, created_at desc')
  }).fetchAll({
    withRelated: ['invoice.customer'],
    transacting: req.trx
  })

  res.status(200).respond(undeposited, UndepositedSerializer)

}

export default undepositedRoute
