import { UserToken, Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Appraisals',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals/employees',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Employee', key: 'employee.full_name', primary: true },
      { label: 'Created', key: 'created_at', format: 'date' }
    ],
    filters: [
      { label: 'Employee', name: 'employee_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'appraisal',
    icon: 'check',
    link: (record) => `/admin/appraisals/appraisals/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
