import PropTypes from 'prop-types'
import React from 'react'
import mt from './mt'

class Analytics extends React.Component {

  static childContextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    app_id: PropTypes.object,
    children: PropTypes.any
  }

  _handleEvent = this._handleEvent.bind(this)
  _handleView = this._handleView.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    // if(!this._isProduction()) return
    this._handleLoadMT()
  }

  getChildContext() {
    return {
      analytics: {
        event: this._handleEvent,
        view: this._handleView
      }
    }
  }

  _isProduction() {
    return true //process.env.NODE_ENV === 'production'
  }

  _handleLoadMT(id) {
    const { app_id } = this.props
    if(!app_id) return
    mt.initialize(app_id)
  }

  _handleEvent(category, action, extra = {}) {
    if(!this._isProduction()) return
    const { app_id } = this.props
    if(app_id) {
      mt.event({
        category,
        action,
        ...extra
      })
    }
  }

  _handleView() {
    if(!this._isProduction()) return
    const { app_id } = this.props
    const page = window.location.pathname
    if(app_id) {
      mt.trackPageView(page)
    }
  }

}

export default Analytics
