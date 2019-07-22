import { UserToken, Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Appraisals',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals/report',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Supervisor', key: 'supervisor.full_name', primary: true },
      { label: 'Employee', key: 'employee.full_name', primary: true },
      { label: 'Created', key: 'created_at', format: 'date' }
    ],
    filters: [
      { label: 'Supervisor', name: 'supervisor_id', type: 'select', multiple: true, endpoint: '/api/admin/users/supervisors', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Employee', name: 'employee_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'appraisal',
    icon: 'check',
    link: (record) => `/admin/appraisals/appraisals/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
