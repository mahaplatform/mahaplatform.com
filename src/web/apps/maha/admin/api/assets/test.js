import { Route } from '../../../../../core/backframe'
import { validateRequest, checkUploadedFile } from '../../../services/asset'

const processor = async (req, trx, options) => {

  await validateRequest(req.query, req.files, false)

  return await checkUploadedFile(req, trx)

}

const testRoute = new Route({
  path: '/assets/upload',
  method: 'get',
  processor
})

export default testRoute
