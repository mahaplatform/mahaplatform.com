import { Button, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ email }) => {

  const list = {}

  const design = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/emails/${email.id}/design`
  }

  if(email.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This email was deleted' }
  }

  list.items = [
    { label: 'Title', content: email.display_name },
    { label: 'Program', content: email.program.title },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  list.footer = <Comments entity={`crm_emails/${email.id}`} active={ email.deleted_at === null } />

  return <List { ...list } />

}

Details.propTypes = {
  email: PropTypes.object
}

export default Details
