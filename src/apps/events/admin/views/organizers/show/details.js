import TicketTypeToken from '../../../tokens/ticket_type'
import OrganizerToken from '../../../tokens/organizer'
import { Audit, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, organizer }) => {

  const config = {
    items: [
      { label: 'Name', content: organizer.name },
      { label: 'Email', content: organizer.email },
      { label: 'Phone', content: organizer.phone },
      { component: <Audit entries={ audits } /> }
    ]
  }

  config.footer = <Comments entity={`events_organizers/${organizer.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  organizer: PropTypes.object
}

export default Details
