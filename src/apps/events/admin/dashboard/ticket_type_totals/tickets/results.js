import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-list">
        { records.map((ticket, index) => (
          <div className="maha-list-item" key={`ticket_${index}`}>
            <div className="maha-list-item-label">
              { ticket.name }
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default Results
