import ShortLinkSerializer from '../../../serializers/shortlink_serializer'
import ShortLink from '../../../../maha/models/shortlink'

const showRoute = async (req, res) => {

  const shortlink = await ShortLink.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!shortlink) return res.status(404).respond({
    code: 404,
    message: 'Unable to load shortlink'
  })

  res.status(200).respond(shortlink, ShortLinkSerializer)

}

export default showRoute
