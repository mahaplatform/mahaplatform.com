import { getMetaData } from '../../../services/links'

const previewRoute = async (req, res) => {

  const metatdata = await getMetaData(req, req.query.url)

  res.status(200).respond(metatdata)

}

export default previewRoute
