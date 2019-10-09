import CampaignTypeToken from '../../tokens/campaign_type'
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
      { label: 'Program', key: 'program.title', primary: true }
    ],
    empty: 'You have not yet created any campaigns',
    entity: 'campaign',
    icon: 'bullhorn',
    link: (record) => `/admin/crm/campaigns/${record.type}/${record.code}`,
    new: NewCampaign,
    defaultSort: { key: 'created_at', order: 'desc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'New Campaign',
        modal: NewCampaign
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
