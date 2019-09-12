import Consent from './consent'
import Edit from './edit'
import Note from './note'
import Call from './call'

const cards = {
  call: { component: Call, color: 'teal', icon: 'phone' },
  edit: { component: Edit, color: 'olive', icon: 'pencil' },
  note: { component: Note, color: 'orange', icon: 'sticky-note' },
  consent: { component: Consent, color: 'blue', icon: 'sliders' }
}

export default cards
