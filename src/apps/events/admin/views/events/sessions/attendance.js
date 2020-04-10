import PaymentToken from '../../../tokens/payment'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Attendance extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    attendings: PropTypes.array,
    event: PropTypes.object,
    session: PropTypes.object
  }

  render() {
    const { attendings } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Ticket</td>
              <td className="collapsing">Status</td>
              <td className="button" />
            </tr>
          </thead>
          <tbody>
            { attendings.map((attending, index) => (
              <tr key={`attending_${index}`}>
                <td>{ attending.name }</td>
                <td><PaymentToken value={ attending.is_paid } /></td>
                <td className="button" >
                  <Button { ...this._getButton(attending) } />
                </td>
              </tr>
            )) }
            { attendings.length === 0 &&
              <tr>
                <td colSpan="4" className="center">
                  No tickets have been sold yet for this event
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }

  _getButton(ticket) {
    return {
      label: ticket.is_checked ? 'Checked In' : 'Check In',
      className: ticket.is_checked ? 'ui fluid tiny green button' : 'ui fluid tiny button',
      handler: this._handleClick.bind(this, ticket)
    }
  }

  _handleClick(ticket) {
    const { event, session } = this.props
    if(ticket.is_checked) return
    this.context.network.request({
      endpoint: `/api/admin/events/events/${event.id}/sessions/${session.id}/attendings`,
      method: 'post',
      body: {
        code: ticket.code
      },
      onFailure: () => this.context.flash.set('error', 'Unable to check in')
    })
  }

}

export default Attendance
