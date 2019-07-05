import { Page } from 'maha-admin'
import React from 'react'
import New from './new'
import moment from 'moment'

const TimeCell = ({ starts_at, ends_at}) => (
  <span>{moment(`2019-01-01 ${starts_at}`).format('hh:mm A')} - {moment(`2019-01-01 ${ends_at}`).format('hh:mm A')}</span>
)

const mapPropsToPage = (props, context) => ({
  title: 'Offerings',
  collection: {
    endpoint: '/api/admin/learning/offerings',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Training', key: 'training.title', primary: true },
      { label: 'Date', key: 'date', primary: true, format: 'date' },
      { label: 'Time', key: 'starts_at', primary: true, format: TimeCell }
    ],
    defaultSort: { key: 'date', order: 'desc' },
    entity: 'offering',
    icon: 'calendar',
    link: (record) => `/admin/learning/offerings/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
