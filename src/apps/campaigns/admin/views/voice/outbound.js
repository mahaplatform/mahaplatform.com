import ProgramForm from '@apps/crm/admin/components/programform'
import CompactCampaignToken from '../../tokens/campaign/compact'
import StatusToken from '../../tokens/status'
import { Logo, Page } from '@admin'
import New from './new_outbound'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Outbound Voice Campaigns',
  rights: ['campaigns:manage_voice_campaigns'],
  collection: {
    endpoint: '/api/admin/campaigns/voice/outbound',
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
    criteria: {
      fields: [
        { label: 'Voice Campaign', fields: [
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
      icon: 'phone',
      title: 'No Outbound Voice Campaigns',
      text: 'You have not yet created any outbound voice campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Campaign', modal: <ProgramForm programs={ resources.programs } fields={ resources.fields } form={ New } /> }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/campaigns/voice/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: <ProgramForm programs={ resources.programs } fields={ resources.fields } form={ New } />
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
