import PropTypes from 'prop-types'
import React from 'react'

class PhoneBadge extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className="maha-badge" onClick={ this._handleClick }>
        <i className="fa fa-fw fa-phone" />
      </div>
    )
  }

  _handleClick() {
    this.context.phone.toggle()
  }

}

export default PhoneBadge
