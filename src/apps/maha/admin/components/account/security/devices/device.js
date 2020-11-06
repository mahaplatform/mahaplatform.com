import { ModalPanel } from '@admin'
import { Button, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

class Device extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    display_name: PropTypes.string,
    fingerprint: PropTypes.string,
    icon: PropTypes.string,
    is_this_device: PropTypes.bool,
    last_active_at: PropTypes.string,
    push_enabled: PropTypes.bool,
    session_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { icon, is_this_device } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-device">
          <div className="maha-device-header">
            <i className={`fa fa-fw fa-${icon}`} />
          </div>
          <div className="maha-device-body">
            <List { ...this._getList() } />
          </div>
          { !is_this_device &&
            <div className="maha-device-footer">
              <div className="maha-device-footer-item">
                <Button { ...this._getRemove() } />
              </div>
              <div className="maha-device-footer-item">
                <Button { ...this._getSignout() } />
              </div>
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Device',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getList() {
    const { display_name, fingerprint, push_enabled, last_active_at } = this.props
    return {
      items: [
        { label: 'Device', content: display_name },
        { label: 'Last Active', content: moment(last_active_at).fromNow()},
        { label: 'Push Enabled', content: push_enabled ? 'YES' : 'NO' },
        { label: 'Fingerprint', content: fingerprint }
      ]
    }
  }

  _getRemove() {
    return {
      label: 'Remove this Device',
      className: 'ui red fluid button',
      handler: this._handleRemove
    }
  }

  _getSignout() {
    return {
      label: 'Signout',
      className: 'ui red fluid button',
      handler: this._handleSignout
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleRemove() {
    const { session_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/sessions/${session_id}/remove`,
      method: 'POST',
      onSuccess: () => this.context.modal.pop()
    })
  }

  _handleSignout() {
    const { session_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/sessions/${session_id}/signout`,
      method: 'POST',
      onSuccess: () => this.context.flash.set('success', 'The session has been terminated'),
      onFailure: () => this.context.flash.set('error', 'Unable to terminate the session')
    })
  }

}

export default Device
