import braintree from 'braintree'

export const getGateway = (merchantId) => {

  const { Sandbox, Production } = braintree.Environment

  return braintree.connect({
    environment: process.env.BRAINTREE_ENVIRONMENT === 'production' ? Production : Sandbox,
    merchantId,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
  })

}
