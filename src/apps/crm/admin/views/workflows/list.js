import NewWorkflow from '../../components/newworkflow'
import WorkflowToken from '../../tokens/workflow'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflows',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/workflows',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: WorkflowToken },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Enrolled', key: 'enrolled', collapsing: true, align: 'right' },
      { label: 'Active', key: 'active', collapsing: true, align: 'right' },
      { label: 'Lost', key: 'lost', collapsing: true, align: 'right' },
      { label: 'Converted', key: 'converted', collapsing: true, align: 'right' },
      { label: 'Completed', key: 'completed', collapsing: true, align: 'right' }
    ],
    empty: {
      icon: 'cogs',
      title: 'No Workflow',
      text: 'You have not yet created any workflows',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create New Campaign', modal: NewWorkflow }
      ] : null
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'workflow',
    onClick: (record) => context.router.history.push(`/admin/crm/workflows/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: NewWorkflow
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
