import PropTypes from 'prop-types'
import React from 'react'

class PhoneBadge extends React.Component {

  static contextTypes = {
    help: PropTypes.object,
    router: PropTypes.object
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
    if(document.body.clientWidth <= 768) {
      return this.context.router.history.push('/admin/help')
    }
    this.context.help.toggle()
  }

}

export default PhoneBadge
