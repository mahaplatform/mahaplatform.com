import { Page } from 'maha-admin'
<<<<<<< HEAD

const mapPropsToPage = (props, context) => ({
  title: 'Assignments',
=======
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Offerings',
>>>>>>> working through training management
  collection: {
    endpoint: '/api/admin/learning/assignments',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Training', key: 'training.title', primary: true },
      { label: 'Completed', key: 'is_complete', primary: false, format: 'check' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
<<<<<<< HEAD
    link: (record) => `/admin/learning/assignments/${record.id}`
=======
    link: (record) => `/admin/learning/assignments/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
>>>>>>> working through training management
  }
})

export default Page(null, mapPropsToPage)
