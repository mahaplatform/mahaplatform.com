import Preferences from './preferences'
import Subscription from './subscription'
import Edit from './edit'
import Note from './note'
import Call from './call'

const cards = {
  call: { component: Call, color: 'teal', icon: 'phone' },
  edit: { component: Edit, color: 'olive', icon: 'pencil' },
  note: { component: Note, color: 'orange', icon: 'sticky-note' },
  preferences: { component: Preferences, color: 'blue', icon: 'envelope' },
  subscription: { component: Subscription, color: 'blue', icon: 'envelope' }
}

export default cards
