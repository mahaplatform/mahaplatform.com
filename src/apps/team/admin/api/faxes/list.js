import FaxSerializer from '../../../serializers/fax_serializer'
import Fax from '../../../../maha/models/fax'

const listRoute = async (req, res) => {

  const faxes = await Fax.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).sort({
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

export default listRoute
