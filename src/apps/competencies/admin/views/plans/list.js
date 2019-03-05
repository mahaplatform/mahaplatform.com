import PlanToken from '../../components/plan_token'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Plans',
  collection: {
    endpoint: '/api/admin/competencies/plans',
    table: [
      { label: 'Plan', key: 'created_at', primary: true, format: PlanToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'plan',
    icon: 'list',
    empty: 'You do not yet have any plans',
    link: (record) => `/admin/competencies/plans/${record.id}`
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
