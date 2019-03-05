import { Page, CompactUserToken } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Supervisors',
  collection: {
    endpoint: '/api/admin/team/supervisors',
    table: [
      { label: 'Name', key: 'maha_users.last_name', primary: true, format: CompactUserToken }
    ],
    defaultSort: { key: 'maha_users.last_name', order: 'asc' },
    entity: 'supervisor',
    icon: 'user-circle',
    link: (record) => `/admin/team/supervisors/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
