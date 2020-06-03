import PropTypes from 'prop-types'
import React from 'react'

class PhoneBadge extends React.Component {

  static contextTypes = {
    phone: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className="maha-badge" onClick={ this._handleClick }>
        <i className="fa fa-fw fa-phone" />
      </div>
    )
  }

  _handleClick() {
    if(document.body.clientWidth <= 768) {
      return this.context.router.history.push('/admin/crm/phone')
    }
    this.context.phone.toggle()
  }

}

export default PhoneBadge
