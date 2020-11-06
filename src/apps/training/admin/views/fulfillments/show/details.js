import { List } from '@admin'
import Registration from '../registration'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const Details = ({ user, fulfillment }) => {

  const list = {}

  if(fulfillment.is_complete) {
    list.alert = { color: 'green', message: 'This training is completed' }
  }

  list.items = [
    { label: 'Training', content: fulfillment.training.title }
  ]

  if(fulfillment.training.url) {
    list.items.push({ label: 'URL', content: <a href={ fulfillment.training.url } target="_blank">{ fulfillment.training.url }</a> })
  }
  if(fulfillment.training.location) {
    list.items.push({ label: 'Location', content: fulfillment.training.location })
  }
  if(fulfillment.training.contact) {
    list.items.push({ label: 'Contact', content: fulfillment.training.contact })
  }

  if(fulfillment.training.type === 'local' && !fulfillment.completed_at) {
    if(fulfillment.offering) {
      list.items.push({
        label: 'Registration',
        content: (
          <div>
            { moment(fulfillment.offering.date).format('dddd, MMMM DD, YYYY') }<br />
            Time: { moment(`2019-01-01 ${fulfillment.offering.starts_at}`).format('hh:mm A') } - { moment(`2019-01-01 ${fulfillment.offering.ends_at}`).format('hh:mm A') }<br />
            Facilitator: {fulfillment.offering.facilitator }<br />
            Location: {fulfillment.offering.location }
          </div>
        )
      })
      if(user.id == fulfillment.user.id && moment(fulfillment.offering.date) >= moment()) {
        list.buttons = [{
          label: 'Change Registration',
          color: 'green',
          modal: <Registration fulfillment={ fulfillment } />
        }]
      }
    } else {
      list.items.push({
        label: 'Registration',
        content: (
          <span className="error">You have not yet registered to attend an offering of this training</span>
        )
      })
      if(user.id == fulfillment.user.id) {
        list.buttons = [{
          label: 'Register for a training',
          color: 'green',
          modal: <Registration fulfillment={ fulfillment } />
        }]
      }
    }
  }

  return <List { ...list } />

}

Details.propTypes = {
  fulfillment: PropTypes.object,
  user: PropTypes.object
}

export default Details
