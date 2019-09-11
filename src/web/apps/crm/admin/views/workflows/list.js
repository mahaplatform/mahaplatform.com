import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Automation',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/workflows`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any workflows',
    entity: 'workflow',
    icon: 'cogs',
    link: (record) => `/admin/crm/programs/${page.params.program_id}/workflows/${record.id}`,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Workflow',
        // modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
