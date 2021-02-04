import { UserToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-phone-search-results">
        { records.map((user, index) => (
          <div className="maha-phone-search-result" key={`record_${index}`} onClick={ this._handleChoose.bind(this, user) }>
            <UserToken { ...user } />
          </div>
        ))}
      </div>
    )
  }

  _handleChoose(user) {
    this.props.onChoose(user)
  }

}

export default Results
