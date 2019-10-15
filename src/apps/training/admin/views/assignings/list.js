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
    empty: {
      icon: 'check',
      title: 'No Assignments',
      text: 'You have not yet created any assignments',
      buttons: [
        { label: 'Create Assignment', modal: New }
      ]
    },
    entity: 'assignment',
    link: (record) => `/admin/training/assignings/${record.id}`
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
