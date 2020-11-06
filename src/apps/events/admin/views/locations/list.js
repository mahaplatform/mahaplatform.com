import ProgramForm from '@apps/crm/admin/components/programform'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Locations',
  collection: {
    endpoint: '/api/admin/events/locations',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'name', primary: true }
    ],
    defaultSort: { key: 'name', order: 'asc' },
    empty: {
      icon: 'map-marker',
      title: 'No Locations',
      text: 'You have not yet created any locations',
      buttons: []
    },
    entity: 'event'
  }
})

export default Page(null, mapPropsToPage)
