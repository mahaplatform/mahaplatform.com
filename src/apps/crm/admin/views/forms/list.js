import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Forms',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/forms',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', sort: 'program' },
      { label: 'Respondants', key: 'respondants_count', collapsing: true, align: 'right' },
      { label: 'Responses', key: 'responses_count', collapsing: true, align: 'right' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right', format: 'currency' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'check-square-o',
      title: 'No Forms',
      text: 'You have not yet created any forms',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create New Form', modal: New }
      ] : null
    },
    entity: 'form',
    onClick: (record) => context.router.history.push(`/admin/crm/forms/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    label: 'Create Form',
    icon: 'plus',
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
