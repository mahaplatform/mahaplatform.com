import PaymentToken from '../../../tokens/payment'
import { Searchbox } from 'maha-admin'
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

  state = {
    q: ''
  }

  _handleQuery = this._handleQuery.bind(this)

  render() {
    const { attendings } = this.props
    const filtered = this._getAttendings()
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Ticket</td>
              <td className="collapsing" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2" className="maha-table-search">
                <Searchbox { ...this._getSearchbox() } />
              </td>
            </tr>
            { filtered.map((attending, index) => (
              <tr key={`attending_${index}`}>
                <td>
                  <strong>{ attending.name }</strong><br />
                  { attending.ticket_type.name } <PaymentToken value={ attending.is_paid } />
                </td>
                <td className="collapsing">
                  <div className={ this._getClass(attending) } onClick={ this._handleToggle.bind(this, attending) }>
                    <i className="fa fa-check" />
                  </div>
                </td>
              </tr>
            )) }
            { attendings.length === 0 &&
              <tr>
                <td colSpan="2" className="center">
                  No tickets have been sold yet for this event
                </td>
              </tr>
            }
            { attendings.length > 0 && filtered.length === 0 &&
              <tr>
                <td colSpan="2" className="center">
                  No tickets match your query
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }

  _getAttendings() {
    const { attendings } = this.props
    const { q } = this.state
    return attendings.filter(attending => {
      return attending.name.toLowerCase().search(q.toLowerCase()) >= 0
    })
  }

  _getClass(ticket) {
    return ticket.is_checked ? 'ui tiny green button' : 'ui tiny button'
  }

  _handleToggle(ticket) {
    const { event, session } = this.props
    this.context.network.request({
      endpoint: `/api/admin/events/events/${event.id}/sessions/${session.id}/attendings`,
      method: ticket.is_checked ? 'delete' : 'post',
      body: {
        code: ticket.code
      },
      onFailure: () => this.context.flash.set('error', 'Unable to check in/out')
    })
  }

  _getSearchbox() {
    return {
      label: 'Find an attendee',
      onChange: this._handleQuery
    }
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Attendance
