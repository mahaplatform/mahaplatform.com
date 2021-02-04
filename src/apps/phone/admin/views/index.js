import PhoneNumbersDesign from './phone_numbers/design'
import PhoneNumbersList from './phone_numbers/list'
import PhoneNumbersShow from './phone_numbers/show'
import CallList from './calls/list'
import CallShow from './calls/show'

const routes = [
  { path: '/calls', component: CallList },
  { path: '/calls/:id', component: CallShow },
  { path: '/phone_numbers', component: PhoneNumbersList },
  { path: '/phone_numbers/:id', component: PhoneNumbersShow },
  { path: '/phone_numbers/:id/design', component: PhoneNumbersDesign }
]

export default routes
