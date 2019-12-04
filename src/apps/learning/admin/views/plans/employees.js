import { UserToken, Page } from 'maha-admin'
import StatusToken from '../../tokens/status_token'
import Status from '../../tokens/status'
import New from '../employees/new'

const mapPropsToPage = (props, context) => ({
  title: 'Plans',
  collection: {
    endpoint: '/api/admin/learning/plans/employees',
    table: [
      { label: 'Employee', key: 'employee.full_name', primary: true },
      { label: 'Due', key: 'due', format: 'date' },
      { label: 'Status', key: 'status', sort: 'status', format: Status, collapsing: true }
    ],
    filters: [
      { label: 'Employee', name: 'employee_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Due', name: 'due', type: 'daterange' },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options:[{ value:'pending',text:'pending' },{ value:'active',text:'active' },{ value:'submitted',text:'submitted' },{ value:'completed',text:'completed' }], format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'list',
      title: 'No Plans',
      text: 'You have not yet created any plans',
      buttons: [
        { label: 'Create Plan', modal: New }
      ]
    },
    entity: 'plan',
    onClick: (record) => context.router.history.push(`/admin/learning/plans/${record.id}`),
    rowClass: (record) => record.status
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
