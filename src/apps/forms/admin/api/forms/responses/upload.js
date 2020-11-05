import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import Asset from '@apps/maha/models/asset'
import Response from '../../../../models/response'

const uploadRoute = async (req, res) => {

  const response = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', req.params.form_id)
    qb.where('id', req.params.response_id)
  }).fetch({
    transacting: req.trx
  })

  if(!response) return res.status(404).respond({
    code: 404,
    message: 'Unable to load response'
  })

  const asset = await Asset.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!asset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load asset'
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default uploadRoute
