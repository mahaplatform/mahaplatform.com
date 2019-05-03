import { validateRequest, uploadChunk } from '../../../services/asset'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  await validateRequest(req.body, req.files, false)

  return await uploadChunk(req, trx)

}

const uploadRoute = new Route({
  path: '/assets/upload',
  method: 'post',
  processor
})

export default uploadRoute
