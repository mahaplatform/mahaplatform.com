import EmailPreview from '../../components/email_preview'
import { Audit, Button, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, email }) => {

  const list = {}

  const design = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/automation/emails/${email.id}/design`
  }

  if(email.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This email was deleted' }
  }

  list.header = <EmailPreview email={ email } link={`/admin/emails/email/${email.id}/preview`} />

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

  list.items.push({ component: <Audit entries={ audits } /> })

  list.footer = <Comments entity={`crm_emails/${email.id}`} active={ email.deleted_at === null } />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  email: PropTypes.object
}

export default Details
