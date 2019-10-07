import NewCampaign from '../../components/campaign'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Campaigns',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/campaigns',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any campaigns',
    entity: 'campaign',
    icon: 'bullhorn',
    link: (record) => `/admin/crm/campaigns/${record.id}`,
    new: NewCampaign,
    defaultSort: { key: 'title', order: 'asc' }
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
