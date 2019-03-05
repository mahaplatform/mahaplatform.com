import Subscriptions from './subscriptions'
import DoNotDisturb from './do_not_disturb'
import { ModalPanel } from 'reframe'
import PropTypes from 'prop-types'
import Preferences from './preferences'
import React from 'react'

class Notifications extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handlePreferences = this._handlePreferences.bind(this)
  _handleDoNotDisturb = this._handleDoNotDisturb.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-security">
          <div className="maha-security-header">
            <i className="fa fa-fw fa-bell" />
          </div>
          <div className="maha-security-body">
            <div className="maha-security-item" onClick={ this._handlePreferences }>
              <div className="maha-security-item-label">
                <strong>Change Preferences</strong><br />
                Change how you would like to be notified
              </div>
              <div className="maha-security-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
            <div className="maha-security-item" onClick={ this._handleSubscriptions }>
              <div className="maha-security-item-label">
                <strong>Manage Events</strong><br />
                Choose how you would like to be notified for specifc events
              </div>
              <div className="maha-security-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
            <div className="maha-security-item" onClick={ this._handleDoNotDisturb }>
              <div className="maha-security-item-label">
                <strong>Do Not Disturb</strong><br />
                Indicate when you&apos;d like to be left alone
              </div>
              <div className="maha-security-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      color: 'purple',
      title: 'Notifications',
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handlePreferences() {
    this.context.modal.push(<Preferences />)
  }

  _handleDoNotDisturb() {
    this.context.modal.push(<DoNotDisturb />)
  }

  _handleSubscriptions() {
    this.context.modal.push(<Subscriptions />)
  }

}

export default Notifications
