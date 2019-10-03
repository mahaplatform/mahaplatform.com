import { Page, UserToken } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Employees',
  collection: {
    endpoint: '/api/admin/learning/employees',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'full_name', primary: true, format: UserToken }
    ],
    defaultSort: { key: 'last_name', order: 'asc' },
    entity: 'employee',
    icon: 'user-circle',
    empty: 'You have not yet been assigned any employees',
    link: (record) => `/admin/learning/employees/${record.id}`
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
