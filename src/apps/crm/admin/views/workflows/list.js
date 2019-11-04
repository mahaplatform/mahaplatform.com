import WorkflowToken from '../../tokens/workflow'
import StatusToken from '../../tokens/status'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflows',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/workflows',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true, format: WorkflowToken },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: StatusToken }
    ],
    empty: {
      icon: 'cogs',
      title: 'No Workflow',
      text: 'You have not yet created any workflows',
      buttons: [
        { label: 'Create Workflow', modal: New }
      ]
    },
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'workflow',
    onClick: (record) => context.router.history.push(`/admin/crm/workflows/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Workflow',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
