import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ email }) => {

  const list = {}

  const design = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/emails/${email.id}/design`
  }

  list.items = [
    { label: 'Title', content: email.display_name },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  email: PropTypes.object
}

export default Details
