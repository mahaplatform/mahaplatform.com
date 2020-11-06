import SecurityQuestion from './security_question'
import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Password from './password'
import Devices from './devices'
import React from 'react'

class Security extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDevices = this._handleDevices.bind(this)
  _handlePassword = this._handlePassword.bind(this)
  _handleSecurityQuestion = this._handleSecurityQuestion.bind(this)

  render() {
    const { account } = this.context.admin
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-security">
          <div className="maha-security-header">
            <i className="fa fa-fw fa-shield" />
          </div>
          <div className="maha-security-body">
            { account.authentication_strategy === 'local' &&
              <div className="maha-security-item" onClick={ this._handlePassword }>
                <div className="maha-security-item-label">
                  <strong>Change Password</strong><br />
                  Change the passord you use to signin
                </div>
                <div className="maha-security-item-proceed">
                  <i className="fa fa-fw fa-chevron-right" />
                </div>
              </div>
            }
            { account.authentication_strategy === 'local' &&
              <div className="maha-security-item" onClick={ this._handleSecurityQuestion }>
                <div className="maha-security-item-label">
                  <strong>Change Security Question</strong><br />
                  Update the info used to reset your password
                </div>
                <div className="maha-security-item-proceed">
                  <i className="fa fa-fw fa-chevron-right" />
                </div>
              </div>
            }
            <div className="maha-security-item" onClick={ this._handleDevices }>
              <div className="maha-security-item-label">
                <strong>Manage Devices</strong><br />
                Manage the devices you use to access
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
      color: 'green',
      title: 'Security',
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleDevices() {
    this.context.modal.push(<Devices />)
  }

  _handlePassword() {
    this.context.modal.push(<Password />)
  }

  _handleSecurityQuestion() {
    this.context.modal.push(<SecurityQuestion />)
  }

}

export default Security
