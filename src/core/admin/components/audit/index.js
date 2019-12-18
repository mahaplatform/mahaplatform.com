import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import Avatar from '../avatar'

class Audit extends React.Component {

  static propTypes = {
    entries: PropTypes.array
  }

  render() {
    const { entries } = this.props
    return (
      <div className="maha-audit">
        { entries.map((entry, index) => (
          <div className="maha-audit-entry" key={`entry_${index}`}>
            <div className="maha-audit-entry-avatar">
              <Avatar user={ this._getSubject(entry) } width="16" height="16" presence={ false } />
            </div>
            <div className="maha-audit-entry-details">
              <div className="maha-audit-entry-text">
                { entry.story }
                { ` by ${this._getSubject(entry).full_name}` }
              </div>
              <div className="maha-audit-entry-timestamp">
                { moment(entry.created_at).format('MM/DD/YY @ h:mm A') }
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getSubject(entry) {
    return entry.contact || entry.user
  }
  
}

export default Audit
