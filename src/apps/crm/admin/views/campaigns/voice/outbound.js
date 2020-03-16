import CompactCampaignToken from '../../../tokens/campaign/compact'
import NewCampaign from '../../../components/newcampaign'
import StatusToken from '../../../tokens/status'
import { Page } from 'maha-admin'
import New from './new_outbound'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Outbound Voice Campaigns',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/campaigns/voice/outbound',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: CompactCampaignToken },
      { label: 'Program', key: 'program.title', sort: 'program' },
      { label: 'Calls', key: 'calls_count', collapsing: true, align: 'right' },
      { label: 'Hangups', key: 'hangups_count', collapsing: true, align: 'right' },
      { label: 'Converted', key: 'converted_count', collapsing: true, align: 'right' },
      { label: 'Completed', key: 'completed_count', collapsing: true, align: 'right' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'phone',
      title: 'No Outbound Voice Campaigns',
      text: 'You have not yet created any outbound voice campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Campaign', modal: <NewCampaign type="voice" form={ New } /> }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/voice/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: <NewCampaign type="voice" form={ New } />
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
