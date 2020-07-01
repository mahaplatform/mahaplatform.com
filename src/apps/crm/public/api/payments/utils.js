import braintree from 'braintree'

export const getGateway = () => {

  const { Sandbox, Production } = braintree.Environment

  return braintree.connect({
    environment: process.env.BRAINTREE_ENVIRONMENT === 'production' ? Production : Sandbox,
    bankId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
  })

}
