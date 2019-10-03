import PropTypes from 'prop-types'
import React from 'react'

class AccessTypeToken extends React.Component {

  static propTypes = {
    access_type_id: PropTypes.number,
    is_revoked: PropTypes.bool,
    onUpdate: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { access_type_id, is_revoked } = this.props
    if(is_revoked) return (
      <div className="maha-assignment-item-access">
        <span className="revoked">REVOKED</span>
      </div>
    )
    if(access_type_id === 1) return (
      <div className="maha-assignment-item-access">
        <span className="owner">IS OWNER</span>
      </div>
    )
    if(access_type_id === 2) return (
      <div className="maha-assignment-item-access" onClick={ this._handleClick.bind(this, 3) }>
        <span className="edit">
          CAN EDIT <i className="fa fa-caret-down" />
        </span>
      </div>
    )
    if(access_type_id === 3) return (
      <div className="maha-assignment-item-access" onClick={ this._handleClick.bind(this, 2) }>
        <span className="view">
          CAN VIEW <i className="fa fa-caret-down" />
        </span>
      </div>
    )
  }

  _handleClick(access_type_id) {
    this.props.onUpdate(access_type_id)
  }

}

export default AccessTypeToken
