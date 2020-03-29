import CompactCampaignToken from '../../../tokens/campaign/compact'
import ProgramForm from '../../../components/programform'
import StatusToken from '../../../tokens/status'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaigns',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/campaigns/email',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: CompactCampaignToken },
      { label: 'Program', key: 'program.title', sort: 'program' },
      { label: 'Opened', key: 'opened', collapsing: true, align: 'right' },
      { label: 'Clicked', key: 'clicked', collapsing: true, align: 'right' },
      { label: 'Bounced', key: 'bounced', collapsing: true, align: 'right' },
      { label: 'Unsubscribed', key: 'unsubscribed', collapsing: true, align: 'right' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'envelope',
      title: 'No Email Campaigns',
      text: 'You have not yet created any email campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Campaign', modal: <ProgramForm programs={ resources.programs } form={ New } /> }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/${record.type}/${record.id}`)
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
      access_type: {
        $in: ['manage','edit']
      }
    }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
