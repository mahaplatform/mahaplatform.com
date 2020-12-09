import braintree from '@core/vendor/braintree'

const tokenRoute = async (req, res) => {

  const response = await new Promise((resolve, reject) => {
    braintree.clientToken.generate((err, response) => {
      if(err) return reject(err)
      resolve(response)
    })
  })

  res.status(200).respond({
    token: response.clientToken
  })

}

export default tokenRoute
