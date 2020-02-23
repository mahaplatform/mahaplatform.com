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
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Title', key: 'title', primary: true, format: WorkflowToken },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: StatusToken }
    ],
    empty: {
      icon: 'cogs',
      title: 'No Workflow',
      text: 'You have not yet created any workflows',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Workflow', modal: New }
      ] : null
    },
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'workflow',
    onClick: (record) => context.router.history.push(`/admin/crm/workflows/${record.id}`)
  },
  tasks: resources.programs.length > 0 ? {
    label: 'Create Workflow',
    modal: New
  } : null

})

const mapResourcesToPage = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      access_type: {
        $in: ['manage','edit']
      }
    }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
