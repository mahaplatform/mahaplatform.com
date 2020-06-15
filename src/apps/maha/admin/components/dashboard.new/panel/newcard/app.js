import { AppToken, List, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

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
    const { apps } = this.props
    return {
      items: apps.map(app => ({
        component: <AppToken {...this._getApp(app) } />,
        handler: this._handleChoose.bind(this, app)
      }))
    }
  }

  _getApp(app) {
    return {
      color: app.color,
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
