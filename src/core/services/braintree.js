import braintree from 'braintree'

const { Sandbox, Production } = braintree.Environment

const gateway = braintree.connect({
  environment: process.env.BRAINTREE_ENVIRONMENT === 'production' ? Production : Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
})

export default gateway
