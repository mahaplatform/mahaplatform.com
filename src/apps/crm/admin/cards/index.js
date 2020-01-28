import Workflow from './workflow'
import Consent from './consent'
import Form from './form'
import Edit from './edit'
import Note from './note'
import Call from './call'

const cards = {
  call: { component: Call, color: 'teal', icon: 'phone' },
  edit: { component: Edit, color: 'olive', icon: 'pencil' },
  form: { component: Form, color: 'green', icon: 'check-square' },
  note: { component: Note, color: 'orange', icon: 'sticky-note' },
  consent: { component: Consent, color: 'blue', icon: 'sliders' },
  workflow: { component: Workflow, color: 'pink', icon: 'gears' }
}

export default cards
