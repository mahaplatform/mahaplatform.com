import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Trainings',
  collection: {
    endpoint: '/api/admin/training/trainings',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Type', key: 'type', primary: false }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [{ value: 'local', text: 'Local'},{ value: 'remote', text: 'Remote'},{ value: 'online', text: 'Online'},{ value: 'maha', text: 'Maha'}] }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'training',
    icon: 'graduation-cap',
    link: (record) => `/admin/training/trainings/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
