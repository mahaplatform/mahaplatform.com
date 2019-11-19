import GooglePay from './googlepay'
import ApplePay from './applepay'
import PayPal from './paypal'
import Card from './card'
import ACH from './ach'

export const methods = [
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
  },
  {
    name: 'googlepay',
    component: GooglePay
  },
  {
    name: 'paypal',
    component: PayPal
  }
]

if (window.ApplePaySession && ApplePaySession.supportsVersion(3) && ApplePaySession.canMakePayments()) {
  methods.push({
    name: 'apple',
    component: null
  })
}
