import SessionToken from '../../../../tokens/session'
import PropTypes from 'prop-types'
import React from 'react'

class Sessions extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object,
    sessions: PropTypes.array
  }

  render() {
    const { sessions } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Session</td>
              <td />
            </tr>
          </thead>
          <tbody>
            { sessions.map((session, index) => (
              <tr key={`session_${index}`} onClick={ this._handleClick.bind(this, session) }>
                <td className="unpadded">
                  <SessionToken { ...session } />
                </td>
                <td className="proceed">
                  <i className="fa fa-chevron-right" />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  _handleClick(session) {
    const { router } = this.context
    const { event } = this.props
    router.history.push(`/events/events/${event.id}/sessions/${session.id}`)
  }

}

export default Sessions
