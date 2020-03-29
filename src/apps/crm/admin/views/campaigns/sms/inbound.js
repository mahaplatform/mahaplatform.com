import CompactCampaignToken from '../../../tokens/campaign/compact'
import ProgramForm from '../../../components/programform'
import StatusToken from '../../../tokens/status'
import { Page } from 'maha-admin'
import New from './new_inbound'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Inbound SMS Campaigns',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/campaigns/sms/inbound',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Trigger Term', key: 'title', primary: true, format: CompactCampaignToken },
      { label: 'Program', key: 'program.title', sort: 'program' },
      { label: 'Sessions', key: 'sessions_count', collapsing: true, align: 'right' },
      { label: 'Active', key: 'active_count', collapsing: true, align: 'right' },
      { label: 'Lost', key: 'lost_count', collapsing: true, align: 'right' },
      { label: 'Converted', key: 'converted_count', collapsing: true, align: 'right' },
      { label: 'Completed', key: 'completed_count', collapsing: true, align: 'right' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'comment',
      title: 'No Inbound SMS Campaigns',
      text: 'You have not yet created any inbound SMS campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Campaign', modal: <ProgramForm programs={ resources.programs } type="sms" form={ New } /> }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/sms/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: <ProgramForm programs={ resources.programs } form={ New } />
  } : null
})

const mapResourcesToPage = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      phone_number_id: {
        $nnl: true
      },
      access_type: {
        $in: ['manage','edit']
      }
    }
  }
})
export default Page(mapResourcesToPage, mapPropsToPage)
