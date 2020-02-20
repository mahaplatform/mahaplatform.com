import FaxSerializer from '../../../serializers/fax_serializer'
import Fax from '../../../../maha/models/fax'

const showRoute = async (req, res) => {

  const fax = await Fax.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['from','to','asset.user.photo'],
    transacting: req.trx
  })

  if(!fax) return res.status(404).respond({
    code: 404,
    message: 'Unable to load fax'
  })

  res.status(200).respond(fax, FaxSerializer)

}

export default showRoute
