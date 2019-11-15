import PayPal from './paypal'
import Card from './card'
import ACH from './ach'

const methods = [
  {
    name: 'google',
    label: 'Google Pay',
    icon: 'android',
    component: null
  },
  {
    name: 'paypal',
    label: 'PayPal',
    icon: 'paypal',
    component: PayPal
  },
  {
    name: 'card',
    label: 'Credit Card',
    icon: 'credit-card-alt',
    component: Card
  },
  {
    name: 'ach',
    label: 'Bank Account',
    icon: 'university',
    component: ACH
  }
]

if (window.ApplePaySession && ApplePaySession.supportsVersion(3) && ApplePaySession.canMakePayments()) {
  methods.push(  {
    name: 'apple',
    label: 'Apple Pay',
    icon: 'apple',
    component: null
  })
}

export default methods
