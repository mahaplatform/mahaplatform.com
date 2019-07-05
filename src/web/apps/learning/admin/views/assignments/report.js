import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Assignments',
  collection: {
    endpoint: '/api/admin/learning/assignments/report',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Employee', key: 'employee.full_name', primary: true },
      { label: 'Training', key: 'training.title', primary: true },
      { label: 'Completed', key: 'is_complete', primary: false, format: 'check' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
    link: (record) => `/admin/learning/assignments/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
