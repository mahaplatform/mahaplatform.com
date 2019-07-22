import { UserToken, Page } from 'maha-admin'
import StatusToken from '../../tokens/status_token'
import Status from '../../tokens/status'

const mapPropsToPage = (props, context) => ({
  title: 'Plans',
  collection: {
    endpoint: '/api/admin/learning/plans/employees',
    table: [
      { label: 'Employee', key: 'employee.full_name', primary: true },
      { label: 'Due', key: 'due', format: 'date' },
      { label: 'Status', key: 'status', sort: 'expenses_statuses.text', format: Status, collapsing: true }
    ],
    filters: [
      { label: 'Employee', name: 'employee_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Due', name: 'due', type: 'daterange' },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options:[{ value:'pending',text:'pending' },{ value:'active',text:'active' },{ value:'submitted',text:'submitted' },{ value:'completed',text:'completed' }], format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'plan',
    icon: 'list',
    empty: 'You do not yet have any plans',
    link: (record) => `/admin/learning/plans/${record.id}`,
    rowClass: (record) => record.status
  }
})

export default Page(null, mapPropsToPage)
