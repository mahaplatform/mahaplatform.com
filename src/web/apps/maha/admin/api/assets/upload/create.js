import { uploadChunk } from '../../../../services/assets'

const createRoute = async (req, res) => {

  const data = await uploadChunk(req)

  res.status(200).respond(data)

}

export default createRoute
