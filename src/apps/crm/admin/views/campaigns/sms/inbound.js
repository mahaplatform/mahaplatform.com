import CompactCampaignToken from '../../../tokens/campaign/compact'
import ProgramForm from '../../../components/programform'
import StatusToken from '../../../tokens/status'
import { Logo, Page } from 'maha-admin'
import New from './new_inbound'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Inbound SMS Campaigns',
  rights: ['crm:manage_sms_campaigns'],
  collection: {
    endpoint: '/api/admin/crm/campaigns/sms/inbound',
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
    criteria: {
      fields: [
        { label: 'SMS Campaign', fields: [
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
      icon: 'comment',
      title: 'No Inbound SMS Campaigns',
      text: 'You have not yet created any inbound SMS campaigns',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create Campaign', modal: <ProgramForm programs={ resources.programs } fields={ resources.fields } type="sms" form={ New } /> }
      ] : null
    },
    entity: 'campaign',
    onClick: (record) => context.router.history.push(`/crm/campaigns/sms/${record.id}`)
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
