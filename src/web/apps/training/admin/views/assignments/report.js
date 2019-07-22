import AssigningToken from '../../tokens/assigning_token'
import { CompactUserToken, Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Assignments',
  collection: {
    endpoint: '/api/admin/training/assignments/report',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'User', key: 'user.full_name', primary: true },
      { label: 'Title', key: 'assigning.title', primary: true },
      { label: 'Configured', key: 'is_configured', primary: false, collapsing: true, centered: true, format: 'check_times' },
      { label: 'Completed', key: 'is_completed', primary: false, collapsing: true, centered: true, format: 'check_times' }
    ],
    filters: [
      { label: 'Assignings', name: 'assigning_id', type: 'select', endpoint: '/api/admin/training/assignings', value: 'id', text: 'title', format: AssigningToken },
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: CompactUserToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
    link: (record) => `/admin/training/assignments/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
