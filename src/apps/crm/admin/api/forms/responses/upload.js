import AssetSerializer from '../../../../../maha/serializers/asset_serializer'
import Asset from '../../../../../maha/models/asset'
import Response from '../../../../models/response'
import Form from '../../../../models/form'

const uploadRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.form_id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', form.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load response'
  })

  const asset = await Asset.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.asset_id)
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
