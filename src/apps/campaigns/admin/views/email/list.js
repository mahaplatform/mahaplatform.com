import ProgramForm from '@apps/crm/admin/components/programform'
import CompactCampaignToken from '../../tokens/campaign/compact'
import StatusToken from '../../tokens/status'
import { Page, Logo } from '@admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaigns',
  collection: {
    endpoint: '/api/admin/campaigns/email',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: CompactCampaignToken },
      { label: 'Program', key: 'program.title', sort: 'program' },
      { label: 'Sent', key: 'sent', collapsing: true, align: 'right' },
      { label: 'Open Rate', key: 'open_rate', collapsing: true, format: 'rate' },
      { label: 'Click Rate', key: 'click_rate', collapsing: true, format: 'rate' },
      { label: 'Bounce Rate', key: 'bounce_rate', collapsing: true, format: 'rate' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: StatusToken }
    ],
    criteria: {
      fields: [
        { label: 'Email Campaign', fields: [
          { name: 'Program', key: 'program_id', type: 'select', endpoint: '/api/admin/crm/programs', text: 'title', value: 'id' }
        ] }
      ],
      system: resources.programs.map((program, index) => (
        { id: index, title: program.title, token: <Logo team={ program } width="24" />, config: {
          criteria: [
            { code: 'abc', data: null, field: null, operator: '$and', parent: null, value: null },
            { code: 'def', data: null, field: 'program_id', operator: '$eq', parent: 'abc', value: program.id }
          ]
        } }
      ))
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'envelope',
      title: 'No Email Campaigns',
      text: 'You have not yet created any email campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Campaign', modal: <ProgramForm programs={ resources.programs } fields={ resources.fields } form={ New } /> }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/campaigns/${record.type}/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: <ProgramForm programs={ resources.programs } fields={ resources.fields } form={ New } />
  } : null
})

const mapResourcesToPage = (props, context) => ({
  programs: '/api/admin/crm/programs'
})

export default Page(mapResourcesToPage, mapPropsToPage)
