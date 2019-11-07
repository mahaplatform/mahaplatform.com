import CampaignTypeToken from '../../tokens/campaign_type'
import NewCampaign from '../../components/newcampaign'
import StatusToken from '../../tokens/status'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Campaigns',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/campaigns',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { key: 'type', collapsing: true, format: CampaignTypeToken },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Direction', key: 'direction', primary: true, format:  ({ type, direction }) => `${direction} ${type}`.toUpperCase() },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'bullhorn',
      title: 'No Campaigns',
      text: 'You have not yet created any campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create New Campaign', modal: NewCampaign }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/${record.type}/${record.code}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: NewCampaign
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
