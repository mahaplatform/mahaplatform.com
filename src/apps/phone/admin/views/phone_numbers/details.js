import { Audit, Button, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, phone_number }) => {

  const workflow = {
    label: 'Manage Workflow',
    className: 'link',
    route: `/admin/campaigns/voice/${phone_number.voice_campaign.id}/design`
  }

  const list = {
    items: [
      { label: 'Phone Number', content: phone_number.formatted },
      { label: 'Program', content: phone_number.program.title },
      { label: 'Workflow', content: <Button { ...workflow } /> },
      { component: <Audit entries={ audits } /> }
    ],
    footer: <Comments entity={`maha_phone_number/${phone_number.id}`} />
  }

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  phone_number: PropTypes.object
}

export default Details
