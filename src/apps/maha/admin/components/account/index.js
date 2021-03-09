import Notifications from './notifications'
import { connect } from 'react-redux'
import { Avatar} from '@admin'
import PropTypes from 'prop-types'
import Security from './security'
import Account from './account'
import React from 'react'

class AccountSidebar extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object,
    onDone: PropTypes.func
  }

  state = {
    x0: null,
    offset: 0
  }

  _handleAccount = this._handleAccount.bind(this)
  _handleNotifications = this._handleNotifications.bind(this)
  _handleSecurity = this._handleSecurity.bind(this)
  _handleSignout = this._handleSignout.bind(this)
  _handleTouchStart = this._handleTouchStart.bind(this)
  _handleTouchMove = this._handleTouchMove.bind(this)
  _handleTouchEnd = this._handleTouchEnd.bind(this)

  render() {
    const { user } = this.props
    return (
      <div className="maha-account" { ...this._getSidebar() }>
        <div className="maha-account-identity">
          <Avatar user={ user } width="150" presence={ false } />
          <h2>{ user.full_name }</h2>
          <p>{ user.email }</p>
        </div>
        <div className="maha-account-tasks">
          <div className="maha-account-task" onClick={ this._handleAccount }>
            <i className="fa fa-fw fa-id-card" /> Manage Account
          </div>
          <div className="maha-account-task" onClick={ this._handleSecurity }>
            <i className="fa fa-fw fa-shield" /> Manage Security
          </div>
          <div className="maha-account-task" onClick={ this._handleNotifications }>
            <i className="fa fa-fw fa-bell" /> Manage Notifications
          </div>
          <div className="maha-account-task" onClick={ this._handleSignout }>
            <i className="fa fa-fw fa-power-off" /> Sign Out
          </div>
        </div>
      </div>
    )
  }

  _getSidebar() {
    return {
      style: this._getStyle(),
      onTouchStart: this._handleTouchStart,
      onTouchMove: this._handleTouchMove,
      onTouchEnd: this._handleTouchEnd
    }
  }

  _getStyle() {
    const { offset } = this.state
    if(!offset) return {}
    if(offset > 0) return { transform: `translateX(${offset}px)` }
  }

  _handleAccount() {
    this._handleModal(Account)
  }

  _handleModal(component) {
    this.props.onDone()
    setTimeout(() => this.context.modal.open(component), 250)
  }

  _handleNotifications() {
    this._handleModal(Notifications)
  }

  _handleSecurity() {
    this._handleModal(Security)
  }

  _handleSignout() {
    this.context.admin.signout()
  }

  _handleTouchStart(e) {
    this.setState({
      x0: e.touches ? e.touches[0].clientX : e.clientX
    })
  }

  _handleTouchMove(e) {
    const { x0 } = this.state
    const x1 = e.touches ? e.touches[0].clientX : e.clientX
    this.setState({
      offset: x1 - x0
    })
  }

  _handleTouchEnd(e) {
    const { offset } = this.state
    if(offset > 150) return this.props.onDone()
    this.setState({ x0: 0, offset: 0 })
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(AccountSidebar)
