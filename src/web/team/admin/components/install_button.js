import React from 'react'
import PropTypes from 'prop-types'

class InstallButton extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    flash: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    app: PropTypes.object
  }

  _handleUninstall = this._handleUninstall.bind(this)
  _handleInstall = this._handleInstall.bind(this)

  render() {
    const { app } = this.props
    if(app.installed) {
      return (
        <div className="ui tiny red basic button" onClick={ this._handleUninstall }>
          UNINSTALL
        </div>
      )
    } else {
      return (
        <div className="ui tiny green basic button" onClick={ this._handleInstall }>
          + INSTALL
        </div>
      )
    }
  }

  _handleUninstall() {
    const { app } = this.props
    const { confirm, network, flash } = this.context
    confirm.open('Are you sure you want to uninstall this app?', () => {
      network.request({
        method: 'GET',
        endpoint: `/api/admin/team/apps/${app.id}/uninstall`,
        onFailure: (result) => {
          flash.set('error', 'Unable to uninstall app')
        },
        onSuccess: (result) => {
          flash.set('success', 'App has been uninstalled')
        }
      })
    })
  }

  _handleInstall() {
    const { app } = this.props
    const { network, flash } = this.context
    network.request({
      method: 'GET',
      endpoint: `/api/admin/team/apps/${app.id}/install`,
      onFailure: (result) => {
        flash.set('error', 'Unable to install app')
      },
      onSuccess: (result) => {
        flash.set('success', 'App has been installed')
      }
    })
  }

}

export default InstallButton
