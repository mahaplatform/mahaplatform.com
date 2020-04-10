import TicketTypeToken from '../../../tokens/ticket_type'
import OrganizerToken from '../../../tokens/organizer'
import SessionToken from '../../../tokens/session'
import Quantity from '../../quantity'
import { Button } from 'maha-client'
import PropTypes from 'prop-types'
import Price from '../../price'
import pluralize from 'pluralize'
import React from 'react'
import _ from 'lodash'

class Step1 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    onChange: PropTypes.func,
    onNext: PropTypes.func
  }

  state = {
    quantities: {}
  }

  _handleNext = this._handleNext.bind(this)

  render() {
    const { event } = this.props
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-step1">
              <h1>{ event.title }</h1>
              { event.description &&
                <p dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br />') }} />
              }
              <div className="registration-step1-section">
                <h2>{ pluralize('Session', event.sessions.length) }</h2>
                <div className="registration-step1-sessions">
                  { event.sessions.map((session, index) => (
                    <div className="registration-step1-session" key={`session_${index}`}>
                      <SessionToken { ...session } />
                    </div>
                  ))}
                </div>
              </div>
              { event.organizers.length > 0 &&
                <div className="registration-step1-section">
                  <h2>{ pluralize('Organizer', event.organizers.length) }</h2>
                  <div className="registration-step1-organizers">
                    { event.organizers.map((organizer, index) => (
                      <div className="registration-step1-organizer" key={`organizer_${index}`}>
                        <OrganizerToken { ...organizer } />
                      </div>
                    ))}
                  </div>
                </div>
              }
              <h2>Tickets</h2>
              <div className="registration-step1-tickettypes">
                { event.ticket_types.map((ticket_type, index) => (
                  <div className="registration-step1-tickettype" key={`ticket_type_${index}`}>
                    <div className="registration-step1-tickettype-token">
                      <TicketTypeToken { ...ticket_type } />
                    </div>
                    <div className="registration-step1-tickettype-config">
                      <div className="registration-step1-tickettype-config-item">
                        <Price { ...this._getPrice(ticket_type) } />
                      </div>
                      <div className="registration-step1-tickettype-config-item">
                        <Quantity { ...this._getQuantity(ticket_type) } />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="registration-panel-footer">
          <div className="registration-panel-footer-item" />
          <div className="registration-panel-footer-item">
            <Button { ...this._getNext() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { quantities } = this.state
    if(!_.isEqual(quantities, prevState.quantities)) {
      this.props.onChange(quantities)
    }
  }

  _getMax(ticket_type) {
    const { max_per_order, remaining } = ticket_type
    if(max_per_order && remaining) return Math.min(max_per_order, remaining)
    return max_per_order || remaining || null
  }

  _getNext() {
    const { quantities } = this.state
    const total = Object.values(quantities).reduce((total, quantity) => {
      return total + quantity
    }, 0)
    return {
      label: 'Next &raquo;',
      color: 'red',
      disabled: total === 0,
      handler: this._handleNext
    }
  }

  _getPrice(ticket_type) {
    const { fixed_price, low_price, high_price, price_type } = ticket_type
    return {
      defaultValue: low_price || fixed_price,
      low_price,
      high_price,
      price_type,
      onChange: this._handleUpdatePrice.bind(this, ticket_type)
    }
  }

  _getQuantity(ticket_type) {
    return {
      max: this._getMax(ticket_type),
      onChange: this._handleUpdateQuantity.bind(this, ticket_type)
    }
  }

  _handleNext() {
    this.props.onNext()
  }

  _handleUpdatePrice(ticket_type, price) {
    const { quantities } = this.state
    const { id, fixed_price, low_price } = ticket_type
    this.setState({
      quantities: {
        ...quantities,
        [id]: {
          base_price: fixed_price || low_price,
          tax_rate: 0.00,
          quantity: 0,
          ...quantities[id],
          price
        }
      }
    })
  }

  _handleUpdateQuantity(ticket_type, quantity) {
    const { quantities } = this.state
    const { id, fixed_price, low_price } = ticket_type
    this.setState({
      quantities: {
        ...quantities,
        [id]: {
          base_price: fixed_price || low_price,
          tax_rate: 0.00,
          price: fixed_price || low_price,
          ...quantities[id],
          quantity
        }
      }
    })
  }

}

export default Step1
