import EmailPreview from '@apps/automation/admin/components/email_preview'
import { Audit, Comments, Button, List } from '@admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'
import _ from 'lodash'

const Details = ({ audits, announcement }) => {

  const config = {}

  const design = {
    label: _.includes(['active','draft','inactive'], announcement.status) ? 'Design Email' : 'View Email',
    className: 'link',
    route: `/admin/platform/announcements/${announcement.id}/design`
  }

  config.header = <EmailPreview email={ announcement } link={`/admin/emails/announcement/${announcement.id}/preview`} />

  if(announcement.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This announcement was deleted' }
  } else if(announcement.status === 'draft') {
    config.alert = { color: 'grey', message: 'This announcement is in draft mode' }
  } else if(announcement.status === 'scheduled') {
    config.alert = { color: 'teal', message: 'This announcement is scheduled' }
  } else if(announcement.status === 'sent') {
    config.alert = { color: 'green', message: 'This announcement was sent' }
  }

  config.items = [
    { label: 'Title', content: announcement.title },
    { label: 'To', content: pluralize('account', announcement.recipients, true) }
  ]

  config.items.push({ label: 'Content', content: <Button { ...design } /> })

  if(announcement.delivery_workflow) {

    const workflow = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/automation/workflows/${announcement.delivery_workflow.id}`
    }

    config.items.push({ label: 'Delivery', content: <Button { ...workflow } /> })

  }


  if(announcement.status === 'scheduled') {
    config.items.push({ label: 'Send At', content: announcement.send_at, format: 'datetime' })
  }

  if(announcement.status === 'sent') {
    config.items.push({ label: 'Sent At', content: announcement.sent_at, format: 'datetime' })
  }

  config.items.push({ component: <Audit entries={ audits } /> })

  config.footer = <Comments entity={`crm_email_announcements/${announcement.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  announcement: PropTypes.object
}

export default Details
