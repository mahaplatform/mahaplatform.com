import PropTypes from 'prop-types'
import React from 'react'

class PhoneBadge extends React.Component {

  static contextTypes = {
    help: PropTypes.object
  }

  static propTypes = {}

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className="maha-badge" onClick={ this._handleClick }>
        <i className="fa fa-fw fa-question-circle" />
      </div>
    )
  }

  _handleClick() {
    this.context.help.toggle()
  }

}

export default PhoneBadge
