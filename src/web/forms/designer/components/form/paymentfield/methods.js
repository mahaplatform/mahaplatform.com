import PayPal from './paypal'
import Card from './card'
import ACH from './ach'

export default [
  {
    name: 'apple',
    label: 'Apple Pay',
    icon: 'apple',
    component: null
  },
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
