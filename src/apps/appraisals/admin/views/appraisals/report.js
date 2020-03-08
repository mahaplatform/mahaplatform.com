import { UserToken, Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Appraisals',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals/report',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Employee', key: 'employee.full_name', primary: true },
      { label: 'Supervisor', key: 'supervisor.full_name', primary: true },
      { label: 'Created', key: 'created_at', format: 'date' }
    ],
    filters: [
      { label: 'Employee', name: 'employee_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Supervisor', name: 'supervisor_id', type: 'select', multiple: true, endpoint: '/api/admin/users/supervisors', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'check',
      title: 'No Appraisals',
      text: 'There aren\'t any appraisals'
    },
    entity: 'appraisal',
    onClick: (record) => context.router.history.push(`/admin/appraisals/appraisals/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
