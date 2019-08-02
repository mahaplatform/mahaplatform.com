import Email from './email'
import Edit from './edit'
import Note from './note'
import Call from './call'

const cards = {
  call: { component: Call, color: 'teal', icon: 'phone' },
  edit: { component: Edit, color: 'olive', icon: 'pencil' },
  email: { component: Email, color: 'brown', icon: 'envelope' },
  note: { component: Note, color: 'orange', icon: 'sticky-note' }
}

export default cards
