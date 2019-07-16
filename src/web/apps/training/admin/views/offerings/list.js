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
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Training', key: 'training.title', primary: true },
      { label: 'Date', key: 'date', primary: true, format: 'date' },
      { label: 'Time', key: 'starts_at', primary: true, format: TimeCell },
      { label: 'Attendees', key: 'fulfillments_count', primary: true, format: AttendeesCell }
    ],
    defaultSort: { key: 'date', order: 'desc' },
    entity: 'offering',
    icon: 'calendar',
    link: (record) => `/admin/training/offerings/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
