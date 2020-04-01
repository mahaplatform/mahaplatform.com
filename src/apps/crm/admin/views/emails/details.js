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
    { label: 'Title', content: email.title },
    { label: 'Program', content: email.program.title }
  ]

  if(email.form) {
    list.items.push({ label: 'Form', content: email.form.title })
  } else if(email.event) {
    list.items.push({ label: 'Event', content: email.event.title })
  }

  list.items.push({ label: 'Content', content: <Button { ...design } /> })

  list.footer = <Comments entity={`crm_emails/${email.id}`} active={ email.deleted_at === null } />

  return <List { ...list } />

}

Details.propTypes = {
  email: PropTypes.object
}

export default Details
