import { getMetaData } from '@apps/maha/services/links'

const previewRoute = async (req, res) => {

  const metatdata = await getMetaData(req, req.query.url)

  await res.status(200).respond(metatdata)

}

export default previewRoute
