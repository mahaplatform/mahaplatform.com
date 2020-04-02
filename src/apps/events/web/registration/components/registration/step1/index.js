import TicketTypeToken from '../../../tokens/ticket_type'
import OrganizerToken from '../../../tokens/organizer'
import SessionToken from '../../../tokens/session'
import { Button } from 'maha-client'
import PropTypes from 'prop-types'
import Quantity from '../../quantity'
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
              <p dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br />') }} />
              <h2>Sessions</h2>
              <div className="registration-step1-sessions">
                { event.sessions.map((session, index) => (
                  <div className="registration-step1-session" key={`session_${index}`}>
                    <SessionToken { ...session } />
                  </div>
                ))}
              </div>
              <h2>Organizers</h2>
              <div className="registration-step1-organizers">
                { event.organizers.map((organizer, index) => (
                  <div className="registration-step1-organizer" key={`organizer_${index}`}>
                    <OrganizerToken { ...organizer } />
                  </div>
                ))}
              </div>
              <h2>Tickets</h2>
              <div className="registration-step1-tickettypes">
                { event.ticket_types.map((ticket_type, index) => (
                  <div className="registration-step1-tickettype" key={`ticket_type_${index}`}>
                    <div className="registration-step1-tickettype-token">
                      <TicketTypeToken { ...ticket_type } />
                    </div>
                    <div className="registration-step1-tickettype-quantity">
                      <Quantity { ...this._getQuantity(ticket_type) } />
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
    return {
      label: 'Next &raquo;',
      color: 'red',
      handler: this._handleNext
    }
  }

  _getQuantity(ticket_type) {
    return {
      max: this._getMax(ticket_type),
      onChange: this._handleUpdate.bind(this, ticket_type)
    }
  }

  _handleNext() {
    this.props.onNext()
  }

  _handleUpdate(ticket_type, quantity) {
    const { quantities } = this.state
    const { id } = ticket_type
    this.setState({
      quantities: {
        ...quantities,
        [id]: quantity
      }
    })
  }

}

export default Step1