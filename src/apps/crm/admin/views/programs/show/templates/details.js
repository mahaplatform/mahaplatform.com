import EmailPreview from '@apps/automation/admin/components/email_preview'
import { Button, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ template }) => {

  const config = {}

  const email = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/programs/${template.program.id}/templates/${template.id}/design`
  }

  config.header = <EmailPreview email={ template } link={`/admin/emails/template/${template.id}/preview`} />

  if(template.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This template was deleted' }
  }

  config.items = [
    { label: 'Title', content: template.title },
    { label: 'Email', content: <Button { ...email } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  template: PropTypes.object
}

export default Details
