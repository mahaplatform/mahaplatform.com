import { Page, TwilioStatusToken } from '@admin'
import React from 'react'

const mapResourcesToPage = (props, context) => ({
  numbers: '/api/admin/fax/numbers'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Incoming Faxes',
  alert: resources.numbers.length > 0 ? (
    <span>
      <i className="fa fa-fw fa-fax" /> You can receive faxes at <strong>
        { resources.numbers[0].formatted }
      </strong>
    </span>
  ) : null,
  collection: {
    endpoint: '/api/admin/fax/faxes/incoming',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'From', key: (fax) => fax.from.name || fax.from.formatted },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: TwilioStatusToken }
    ],
    empty: {
      icon: 'fax',
      title: 'No Faxes',
      text: 'You have not yet received any faxes'
    },
    entity: 'fax',
    onClick: (record) => context.router.history.push(`/fax/faxes/${record.id}`),
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
