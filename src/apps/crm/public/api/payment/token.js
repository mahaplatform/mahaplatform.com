import braintree from 'braintree'

const tokenRoute = async (req, res) => {

  const { Sandbox, Production } = braintree.Environment

  var gateway = braintree.connect({
    environment: process.env.BRAINTREE_ENVIRONMENT === 'production' ? Production : Sandbox,
    merchantId: 'zzwjk4rf85jn7mwq',
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
  })

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
