import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const TicketTypeToken = (ticket_type) => (
  <div className={`tickettype-token${!ticket_type.is_active ? ' inactive' : ''}`}>
    <div>
      <strong>{ ticket_type.name }</strong> (
      { ticket_type.price_type === 'fixed' &&
        <span>
          { numeral(ticket_type.fixed_price).format('$0.00') }
        </span>
      }
      { ticket_type.price_type === 'sliding_scale' &&
        <span>
          { numeral(ticket_type.low_price).format('$0.00') } - { numeral(ticket_type.high_price).format('$0.00') }
        </span>
      }
      { ticket_type.price_type === 'free' &&
        <span>
          FREE
        </span>
      }) { !ticket_type.is_active &&
        <span className="alert">
          INACTIVE
        </span>
      }
    </div>
    { ticket_type.description &&
      <div>
        { ticket_type.description }
      </div>
    }
    <div>
      { ticket_type.total_tickets ?
        pluralize('ticket', ticket_type.total_tickets, true) :
        'Unlimited tickets'
      } { ticket_type.max_per_order &&
        <span>(max {ticket_type.max_per_order} per order)</span>
      }
    </div>
    { (ticket_type.sales_open_at && !ticket_type.sales_close_at) &&
      <div>
        Available starting { moment(`${ticket_type.sales_open_at}`).format('MMM D, h:mmA') }
      </div>
    }
    { (!ticket_type.sales_open_at && ticket_type.sales_close_at) &&
      <div>
        Available until { moment(`${ticket_type.sales_close_at}`).format('MMM D, h:mmA') }
      </div>
    }
    { (ticket_type.sales_open_at && ticket_type.sales_close_at) &&
      <div>
        Available from { moment(`${ticket_type.sales_open_at}`).format('MMM D, h:mmA') } - { moment(`${ticket_type.sales_close_at}`).format('MMM D, h:mmA') }
      </div>
    }
    { (!ticket_type.sales_open_at && !ticket_type.sales_close_at) &&
      <div>
        Available indefinitely
      </div>
    }
  </div>
)

TicketTypeToken.propTypes = {
  ticket_type: PropTypes.object
}

export default TicketTypeToken
