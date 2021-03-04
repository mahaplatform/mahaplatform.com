import achMiddleware from './ach/middleware'
import cardMiddleware from './card/middleware'
import googlepayMiddleware from './googlepay/middleware'

const paymentMiddleware = [
  achMiddleware,
  cardMiddleware,
  googlepayMiddleware
]

export default paymentMiddleware
