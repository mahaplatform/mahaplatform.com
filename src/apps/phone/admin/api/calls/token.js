import { getToken } from '@apps/maha/services/twilio'

const tokenRoute = async (req, res) => {

  const token = await getToken(req)

  res.status(200).respond(token)

}

export default tokenRoute
