import { checkToken } from '../utils'

const checkRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }
  
  res.status(204).respond(false)

}

export default checkRoute
