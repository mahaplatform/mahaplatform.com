import { Route } from '../../../server'
import path from 'path'

const handler = async (req, res) => {

  res.sendFile(path.join('uploads', req.params.id))

}

const previewRoute = new Route({
  path: '/assets/:id/preview',
  method: 'get',
  handler
})

export default previewRoute
