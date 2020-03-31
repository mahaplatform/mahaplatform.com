import TicketTypeToken from '../../../tokens/ticket_type'
import OrganizerToken from '../../../tokens/organizer'
import { Audit, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, event }) => {

  const config = {
    sections: [
      {
        items: [
          { label: 'Title', content: event.title },
          { label: 'Description', content: event.description },
          { label: 'Program', content: event.program.title }
        ]
      }, {
        title: 'Ticket Types',
        items: event.ticket_types.map((ticket_type, index) => ({
          component: <TicketTypeToken key={`ticket_type_${index}`} { ...ticket_type } />
        }))
      }
    ]
  }

  if(event.organizers.length > 0) {
    config.sections.push({
      title: 'Organizers',
      items: event.organizers.map((organizer, index) => ({
        component: <OrganizerToken key={`organizer_${index}`} { ...organizer } />
      }))
    })
  }

  config.sections.push({
    items: [
      { component: <Audit entries={ audits } /> }
    ]
  })

  config.footer = <Comments entity={`events_events/${event.id}`} />

  return (
    <div>
      <div>
        You have a wait list of 10
      </div>
      <List { ...config } />
    </div>
  )

}

Details.propTypes = {
  audits: PropTypes.array,
  event: PropTypes.object
}

export default Details
