import { Audit, Button, Comments, List } from 'maha-admin'
import TicketTypeToken from '../../../tokens/ticket_type'
import OrganizerToken from '../../../tokens/organizer'
import PropTypes from 'prop-types'
import Embed from './embed'
import React from 'react'

const Details = ({ audits, event }) => {

  const url = {
    label: event.url,
    className: 'link',
    link: event.url
  }

  const embed = {
    label: 'button code',
    className: 'link',
    modal: {
      component: <Embed event={ event } />,
      options: {
        width: 640,
        height: 480
      }
    }
  }

  const email = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/emails/${event.email.id}/design`
  }

  const workflow = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/workflows/${event.workflow.id}/design`
  }

  const config = {
    sections: [
      {
        items: [
          { label: 'Title', content: event.title },
          { label: 'Description', content: event.description },
          { label: 'URL', content: <Button { ...url } /> },
          { label: 'Code', content: (
            <div>
              { event.code } (<Button { ...embed } />)
            </div>
          ) },
          { label: 'Program', content: event.program.title },
          { label: 'Confirmation', content: <Button { ...email } /> },
          { label: 'Workflow', content: <Button { ...workflow } /> }
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

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  event: PropTypes.object
}

export default Details
