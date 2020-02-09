import { checkUploadedFile } from '../../../../../maha/services/assets'
import Form from '../../../../models/form'
import { checkToken } from '../utils'

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

  const asset = await checkUploadedFile(req)

  if(asset === false) return res.status(204).json({
    code: 204,
    message: 'Unable to find asset'
  })

  if(asset === null) return res.status(200).json({
    code: 200,
    message: 'found'
  })

  res.status(200).respond(asset, true)

}

export default uploadRoute
