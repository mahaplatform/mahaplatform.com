import { AppToken, List, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static contextTypes = {
    configuration: PropTypes.object
  }

  static propTypes = {
    apps: PropTypes.array,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <List { ...this._getList() } />
      </ModalPanel>
    )
  }

  _getList() {
    const { dashboardCards } = this.context.configuration
    const { apps } = this.props

    const cardAppCodes = dashboardCards.map(card => card.app)
    const appsWithCards = apps.filter(app => cardAppCodes.includes(app.code))

    return {
      items: appsWithCards.map(app => ({
        component: <AppToken {...this._getApp(app) } />,
        handler: this._handleChoose.bind(this, app)
      }))
    }
  }

  _getApp(app) {
    return {
      icon: app.icon,
      title: app.label
    }
  }

  _getPanel() {
    return {
      title: 'Choose App',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(app) {
    this.props.onChoose(app)
  }

}

export default App
