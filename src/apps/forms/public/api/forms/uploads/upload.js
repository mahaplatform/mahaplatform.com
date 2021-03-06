import { checkToken } from '@core/services/routes/checks'
import { uploadChunk } from '@apps/maha/services/assets'
import Form from '@apps/forms/models/form'

const uploadRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = form.related('team')

  const asset = await uploadChunk(req)

  if(asset === null) return res.status(200).json({
    code: 200,
    message: 'partly done'
  })

  await res.status(200).respond(asset, (req, asset) => ({
    id: asset.get('id'),
    content_type: asset.get('content_type'),
    file_name: asset.get('file_name')
  }))
}

export default uploadRoute
