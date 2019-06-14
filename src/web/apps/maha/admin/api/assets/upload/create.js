import { uploadChunk } from '../../../../services/asset'

const createRoute = async (req, res) => {

  const data = await uploadChunk(req, req.trx)

  res.status(200).respond(data)

}

export default createRoute
