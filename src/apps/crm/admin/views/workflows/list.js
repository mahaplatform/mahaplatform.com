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
      { label: 'Program', key: 'program.title', sort: 'program', primary: true },
      { label: 'Enrolled', key: 'enrolled_count', collapsing: true, align: 'right' },
      { label: 'Active', key: 'active_count', collapsing: true, align: 'right' },
      { label: 'Lost', key: 'lost_count', collapsing: true, align: 'right' },
      { label: 'Converted', key: 'converted_count', collapsing: true, align: 'right' },
      { label: 'Completed', key: 'completed_count', collapsing: true, align: 'right' }
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
