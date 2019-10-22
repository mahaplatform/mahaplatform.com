import CampaignTypeToken from '../../tokens/campaign_type'
import CampaignStatusToken from '../../tokens/campaign_status'
import NewCampaign from '../../components/newcampaign'
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
      { label: 'Type', key: 'direction', primary: true, format:  ({ type, direction }) => `${direction} ${type}`.toUpperCase() },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: CampaignStatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'bullhorn',
      title: 'No Campaigns',
      text: 'You have not yet created any campaigns',
      buttons: [
        { label: 'Create New Campaign', modal: NewCampaign }
      ]
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/${record.type}/${record.code}`)
  },
  task: {
    icon: 'plus',
    modal: NewCampaign
  }
})

export default Page(null, mapPropsToPage)
