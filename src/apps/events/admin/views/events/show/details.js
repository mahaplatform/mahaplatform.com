import { Audit, Button, Comments, Embed, List } from 'maha-admin'
import TicketTypeToken from '../../../tokens/ticket_type'
import OrganizerToken from '../../../tokens/organizer'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, event }) => {

  const url = {
    label: event.url,
    className: 'link',
    link: event.url
  }

  const embed = {
    title: 'Button Code',
    header: (
      <p>You can place a <strong>Buy Tickets</strong> button on your
      website by pasting this code into your html.</p>
    ),
    code: `<div data-event="${event.code}" />
<script src="${process.env.WEB_HOST}/events/button.js"></script>
<script>
  new MahaEventButton({
    code: '${event.code}',
    className: 'button',
    label: 'Buy Tickets'
  })
</script>`
  }

  const embedEvent = {
    label: 'button code',
    className: 'link',
    modal: {
      component: <Embed { ...embed } />,
      options: {
        width: 640,
        height: 480
      }
    }
  }

  const workflow = {
    label: ' Manage Workflow',
    className: 'link',
    route: `/admin/crm/workflows/${event.workflow.id}`
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
              { event.code } (<Button { ...embedEvent } />)
            </div>
          ) },
          { label: 'Program', content: event.program.title },
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

  if(event.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This event was deleted' }
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
