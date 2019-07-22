import { Page, UserToken } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Employees',
  collection: {
    endpoint: '/api/admin/learning/employees',
    table: [
      { label: 'Name', key: 'full_name', primary: true, format: UserToken }
    ],
    defaultSort: { key: 'last_name', order: 'asc' },
    entity: 'employee',
    icon: 'user-circle',
    empty: 'You have not yet been assigned any employees',
    link: (record) => `/admin/learning/employees/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
