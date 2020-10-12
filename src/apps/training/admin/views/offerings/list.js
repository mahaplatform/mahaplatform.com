import { Page } from 'maha-admin'
import React from 'react'
import New from './new'
import moment from 'moment'

const TimeCell = ({ starts_at, ends_at}) => (
  <span>{moment(`2019-01-01 ${starts_at}`).format('hh:mm A')} - {moment(`2019-01-01 ${ends_at}`).format('hh:mm A')}</span>
)

const AttendeesCell = ({ fulfillments_count, limit }) => (
  <span>{ fulfillments_count } / { limit }</span>
)

const mapPropsToPage = (props, context) => ({
  title: 'Offerings',
  collection: {
    endpoint: '/api/admin/training/offerings',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Training', key: 'training.title', primary: true },
      { label: 'Date', key: 'date', primary: true, format: 'date' },
      { label: 'Time', key: 'starts_at', primary: false, format: TimeCell },
      { label: 'Attendees', key: 'fulfillments_count', primary: false, format: AttendeesCell }
    ],
    defaultSort: { key: 'date', order: 'desc' },
    empty: {
      icon: 'calendar',
      title: 'No Offering',
      text: 'You have not created any offerings',
      buttons: [
        { label: 'Create Offering', modal: New }
      ]
    },
    entity: 'offering',
    onClick: (record) => context.router.history.push(`/training/offerings/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
