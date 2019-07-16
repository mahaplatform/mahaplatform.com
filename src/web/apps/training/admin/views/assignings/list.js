import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Assignings',
  collection: {
    endpoint: '/api/admin/training/assignings',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Assignments', key: 'assignments_count', primary: false },
      { label: 'Assigned By', key: 'assigned_by.full_name', primary: false },
      { label: 'Due By', key: 'completed_by', primary: false, format: 'date' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
    link: (record) => `/admin/training/assignings/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
