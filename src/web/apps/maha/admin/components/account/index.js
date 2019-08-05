import Notifications from './notifications'
import { connect } from 'react-redux'
import { Avatar} from 'maha-admin'
import PropTypes from 'prop-types'
import Security from './security'
import Account from './account'
import React from 'react'

class AccountSidebar extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleAccount = this._handleAccount.bind(this)
  _handleNotifications = this._handleNotifications.bind(this)
  _handleSecurity = this._handleSecurity.bind(this)
  _handleSignout = this._handleSignout.bind(this)
  _handleSwitch = this._handleSwitch.bind(this)

  render() {
    const { user } = this.props
    return (
      <div className="maha-account">
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
          <div className="maha-account-task" onClick={ this._handleSwitch }>
            <i className="fa fa-fw fa-users" /> Switch Account
          </div>
          <div className="maha-account-task" onClick={ this._handleSignout }>
            <i className="fa fa-fw fa-power-off" /> Sign Out
          </div>
        </div>
      </div>
    )
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

  _handleSwitch() {
    this.context.router.history.push('/admin/signin')
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(AccountSidebar)
