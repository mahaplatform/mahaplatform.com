import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

const StatToken = (props, context) => {
  const { queue, value } = props
  const { history } = context.router
  const onClick = () => history.push(`/admin/platform/queues/${queue.name}/${value}`)
  return (
    <div onClick={ onClick }>
      { queue[value] }
    </div>
  )
}

StatToken.propTypes = {
  queue: PropTypes.object,
  value: PropTypes.string
}

StatToken.contextTypes = {
  router: PropTypes.object
}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Queues',
  collection: {
    table: [
      { label: 'Queue', key: 'name', primary: true },
      { label: 'Failed', key: 'failed', collapsing: true, align: 'right', format: (queue) => <StatToken queue={ queue } value="failed" /> },
      { label: 'Completed', key: 'completed', collapsing: true, align: 'right', format: (queue) => <StatToken queue={ queue } value="completed" /> },
      { label: 'Delayed', key: 'delayed', collapsing: true, align: 'right', format: (queue) => <StatToken queue={ queue } value="delayed" /> }
    ],
    endpoint: '/api/admin/platform/queues',
    entity: 'queues',
    defaultSort: { key: 'name', order: 'asc' }
  }
})

export default Page(null, mapPropsToPage)
