import AssigningToken from '../../tokens/assigning'
import { UserToken, Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Assignments',
  collection: {
    endpoint: '/api/admin/training/assignments/report',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'User', key: 'user.full_name', primary: true },
      { label: 'Title', key: 'assigning.title', primary: true },
      { label: 'Configured', key: 'is_configured', collapsing: true, primary: false, align: 'center', format: 'check_times' },
      { label: 'Completed', key: 'is_completed', collapsing: true, primary: false, align: 'center', format: 'check_times' }
    ],
    filters: [
      { label: 'Assignings', name: 'assigning_id', type: 'select', endpoint: '/api/admin/training/assignings', value: 'id', text: 'title', format: AssigningToken },
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'check',
      title: 'No Assignments',
      text: 'No trainings have been assigned'
    },
    entity: 'assignment',
    onClick: (record) => context.router.history.push(`/training/assignments/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
