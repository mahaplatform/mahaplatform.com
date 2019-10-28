import CampaignStatusToken from '../../tokens/campaign_status'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflows',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/workflows',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: CampaignStatusToken }
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
    onClick: (record) => context.router.history.push(`/admin/crm/workflows/${record.code}`)
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
