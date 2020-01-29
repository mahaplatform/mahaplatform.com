import { checkToken } from '../utils'

const uploadRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }
  
  res.status(200).respond(true)

}

export default uploadRoute
