import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ enrollment }) => {

  const contact = {
    label: enrollment.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${enrollment.contact.id}`
  }

  const list = {
    sections: [{
      items: [
        { label: 'Contact', content: <Button { ...contact } /> }
      ]
    }, {
      title: 'Steps',
      items: enrollment.actions.map(action => ({
        content: action.step.action
      }))
    }]
  }

  return <List { ...list } />

}

Details.propTypes = {
  enrollment: PropTypes.object
}

export default Details
