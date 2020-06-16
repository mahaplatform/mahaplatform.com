import TicketTypes from './ticket_types'
import Edit from './edit'
import New from './new'

const card = {
  code: 'ticket_type_totals',
  title: 'Ticket Type Total',
  description: 'An overview of ticket sales broken down by ticket type',
  component: TicketTypes,
  edit: Edit,
  new: New
}

export default card
