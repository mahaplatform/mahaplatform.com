import { UserToken, Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Appraisals',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals/employees',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Employee', key: 'employee.full_name', primary: true },
      { label: 'Created', key: 'created_at', format: 'date' }
    ],
    filters: [
      { label: 'Employee', name: 'employee_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'fax',
      title: 'No Appraisals',
      text: 'You have not yet created any appraisals',
      buttons: [
        { label: 'Create New Appraisal', modal: New }
      ]
    },
    entity: 'appraisal',
    onClick: (record) => context.router.history.push(`/appraisals/appraisals/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
