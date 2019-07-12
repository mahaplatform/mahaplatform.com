import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Employees',
  collection: {
    endpoint: '/api/admin/training/assignments/employees',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'assigning.title', primary: true },
      { label: 'Assigned By', key: 'assigning.assigned_by.full_name', primary: true },
      { label: 'User', key: 'user.full_name', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
    link: (record) => `/admin/training/assignments/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
