import { Page, TwilioStatusToken } from 'maha-admin'
import React from 'react'

const mapResourcesToPage = (props, context) => ({
  numbers: '/api/admin/fax/numbers'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Incoming Faxes',
  collection: {
    alert: (
      <span>
        You can receive faxes at <strong>{ resources.numbers[0].formatted }</strong>
      </span>
    ),
    endpoint: '/api/admin/fax/faxes/incoming',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'From', key: (fax) => fax.from.name || fax.from.formatted },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: TwilioStatusToken }
    ],
    empty: 'You have not yet received any faxes',
    entity: 'fax',
    icon: 'fax',
    link: (record) => `/admin/fax/faxes/${record.id}`,
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
