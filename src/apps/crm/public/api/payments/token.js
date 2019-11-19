import { getGateway } from './utils'

const tokenRoute = async (req, res) => {

  const gateway = getGateway()

  const response = await new Promise((resolve, reject) => {
    gateway.clientToken.generate((err, response) => {
      if(err) return reject(err)
      resolve(response)
    })
  })

  res.status(200).respond({
    token: response.clientToken
  })

}

export default tokenRoute
