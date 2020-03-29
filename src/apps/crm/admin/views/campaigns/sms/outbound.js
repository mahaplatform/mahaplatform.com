import CompactCampaignToken from '../../../tokens/campaign/compact'
import ProgramForm from '../../../components/programform'
import StatusToken from '../../../tokens/status'
import { Page } from 'maha-admin'
import New from './new_outbound'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Outbound SMS Campaigns',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/campaigns/sms/outbound',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: CompactCampaignToken },
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
      title: 'No Outbound SMS Campaigns',
      text: 'You have not yet created any outbound SMS campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Campaign', modal: <ProgramForm type="sms" form={ New } /> }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/sms/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: <ProgramForm form={ New } />
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
