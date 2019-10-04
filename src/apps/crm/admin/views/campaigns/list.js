import CampaignToken from '../../tokens/campaign'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Campaigns',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/campaigns`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any campaigns',
    entity: 'campaign',
    icon: 'bullhorn',
    link: (record) => `/admin/crm/programs/${page.params.program_id}/campaigns/${record.id}`,
    new: <CampaignToken value="email" />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { component: <CampaignToken value="email" /> },
      { component: <CampaignToken value="social" /> },
      { component: <CampaignToken value="sms" /> },
      { component: <CampaignToken value="voice" /> },
      { component: <CampaignToken value="mail" /> }
    ]
  }
})

export default Page(null, mapPropsToPage)
