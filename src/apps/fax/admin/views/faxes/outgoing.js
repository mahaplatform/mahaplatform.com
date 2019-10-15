import { Page, TwilioStatusToken } from 'maha-admin'
import Send from './send'
import React from 'react'

const mapResourcesToPage = (props, context) => ({
  numbers: '/api/admin/fax/numbers'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Outgoing Faxes',
  collection: {
    endpoint: '/api/admin/fax/faxes/outgoing',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sent', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'To', key: (fax) => fax.to.name || fax.to.formatted },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: TwilioStatusToken }
    ],
    empty: {
      icon: 'fax',
      title: 'No Faxes',
      text: 'You have not yet sent any faxes',
      buttons: [
        { label: 'Send Fax', modal: <Send numbers={ resources.numbers } /> }
      ]
    },
    entity: 'fax',
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/fax/faxes/${record.id}`)
  },
  task: {
    label: 'Send Fax',
    icon: 'plus',
    modal: <Send numbers={ resources.numbers } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
