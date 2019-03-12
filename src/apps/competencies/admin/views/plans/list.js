import StatusToken from '../../tokens/status_token'
import PlanToken from '../../tokens/plan_token'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Plans',
  collection: {
    endpoint: '/api/admin/competencies/plans',
    table: [
      { label: 'Plan', key: 'created_at', primary: true, format: PlanToken },
      { label: 'Status', key: 'status', sort: 'expenses_statuses.text', format: StatusToken, collapsing: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'plan',
    icon: 'list',
    empty: 'You do not yet have any plans',
    link: (record) => `/admin/competencies/plans/${record.id}`,
    rowClass: (record) => record.status
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
