import CampaignToken from '../../tokens/campaign'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Campaigns',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/topics',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any campaigns',
    entity: 'campaign',
    icon: 'arrow-right',
    link: (record) => `/admin/crm/topics/${record.id}`,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { component: <CampaignToken value="email_blast" /> },
      { component: <CampaignToken value="email_drip" /> },
      { component: <CampaignToken value="sms_blast" /> },
      { component: <CampaignToken value="sms_workflow" /> },
      { component: <CampaignToken value="voice" /> },
      { component: <CampaignToken value="mail" /> }
    ]
  }
})

export default Page(null, mapPropsToPage)
