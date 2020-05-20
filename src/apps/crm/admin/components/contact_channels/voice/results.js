import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="crm-voice-channel-results">
        { records.map((call, index) => (
          <div className="crm-voice-channel-result" key={`result_${index}`} onClick={ this._handleClick.bind(this, call)}>
            <div className="crm-voice-channel-result-token">
              <div className="crm-voice-channel-token">
                <div className="crm-voice-channel-token-icon">
                  <i className={`fa fa-${this._getIcon(call)}`} />
                </div>
                <div className="crm-voice-channel-token-label">
                  <strong>{ this._getNumber(call) }</strong><br />
                  { call.direction } call
                  <div className="crm-voice-channel-token-timestamp">
                    { moment(call.created_at).format('MMM DD') }
                  </div>
                </div>
              </div>
            </div>
            <div className="crm-voice-channel-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getIcon(call) {
    return call.direction === 'outbound' ? 'arrow-circle-right' : 'arrow-circle-left'
  }

  _getNumber(call) {
    return call.direction === 'outbound' ? call.from.number : call.to.number
  }

  _handleClick(call) {
    const { contact } = this.props
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}/calls/${call.id}`)
  }

}

export default Results
