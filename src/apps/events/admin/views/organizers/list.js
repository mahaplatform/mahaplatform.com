import OrganizerToken from '../../tokens/organizer'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Locations',
  collection: {
    endpoint: '/api/admin/events/organizers',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'name', primary: true, format: OrganizerToken }
    ],
    defaultSort: { key: 'name', order: 'asc' },
    empty: {
      icon: 'user',
      title: 'No Organizers',
      text: 'You have not yet created any organizers',
      buttons: []
    },
    entity: 'event'
  }
})

export default Page(null, mapPropsToPage)
