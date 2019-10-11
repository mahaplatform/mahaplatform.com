import FaxSerializer from '../../../serializers/fax_serializer'
import Fax from '../../../../maha/models/fax'

const listRoute = async (req, res) => {

  const faxes = await Fax.scope({
    team: req.team
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['number'],
    transacting: req.trx
  })

  res.status(200).respond(faxes, FaxSerializer)

}

export default listRoute
