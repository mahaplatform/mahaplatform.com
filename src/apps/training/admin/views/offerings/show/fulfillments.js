import { UserToken, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Fulfillments = ({ fulfillments }) => {

  const list = {
    items: fulfillments.map(fulfillment => ({
      link: `/admin/training/fulfillments/${fulfillment.id}`,
      content: fulfillment,
      component: ({ user }) => <UserToken { ...user } />
    })),
    empty: {
      icon: 'user',
      title: 'No attendees',
      text: 'There are no attendees for this offering'
    }
  }

  return <List { ...list } />

}

Fulfillments.propTypes = {
  fulfillments: PropTypes.array
}

export default Fulfillments
