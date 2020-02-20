import FaxSerializer from '../../../serializers/fax_serializer'
import Fax from '../../../../maha/models/fax'

const outgoingRoute = async (req, res) => {

  const faxes = await Fax.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id')),
      qb.where('user_id', req.user.get('id')),
      qb.where('direction', 'outbound')
    },
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['from','to'],
    transacting: req.trx
  })

  res.status(200).respond(faxes, FaxSerializer)

}

export default outgoingRoute
