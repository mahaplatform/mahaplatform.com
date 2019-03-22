import { Page, CompactUserToken } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Employees',
  collection: {
    endpoint: '/api/admin/competencies/employees',
    table: [
      { label: 'Name', key: 'full_name', primary: true, format: CompactUserToken }
    ],
    defaultSort: { key: 'last_name', order: 'asc' },
    entity: 'employee',
    icon: 'user-circle',
    empty: 'You have not yet been assigned any employees',
    link: (record) => `/admin/competencies/employees/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
