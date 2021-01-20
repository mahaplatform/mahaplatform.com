import PropTypes from 'prop-types'
import React from 'react'
import mt from './mt'

class Analytics extends React.Component {

  static childContextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    app_id: PropTypes.string,
    children: PropTypes.any
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    if(!this._isProduction()) return
    this._handleLoadMT()
  }

  getChildContext() {
    return {
      analytics: {
        addItem: this._handleEvent.bind(this, 'addItem'),
        addTrans: this._handleEvent.bind(this, 'addTrans'),
        enableLinkClickTracking: this._handleEvent.bind(this, 'enableLinkClickTracking'),
        setUserId: this._handleEvent.bind(this, 'setUserId'),
        trackAddToCart: this._handleEvent.bind(this, 'trackAddToCart'),
        trackRemoveFromCart: this._handleEvent.bind(this, 'trackRemoveFromCart'),
        trackSiteSearch: this._handleEvent.bind(this, 'trackSiteSearch'),
        trackAdImpression: this._handleEvent.bind(this, 'trackAdImpression'),
        trackAdClick: this._handleEvent.bind(this, 'trackAdClick'),
        trackAdConversion: this._handleEvent.bind(this, 'trackAdConversion'),
        trackStructEvent: this._handleEvent.bind(this, 'trackStructEvent'),
        trackPageView: this._handleEvent.bind(this, 'trackPageView'),
        trackSocialInteraction: this._handleEvent.bind(this, 'trackSocialInteraction'),
        trackTrans: this._handleEvent.bind(this, 'trackTrans'),
        updatePageActivity: this._handleEvent.bind(this, 'updatePageActivity')
      }
    }
  }

  _isProduction() {
    return process.env.NODE_ENV === 'production'
  }

  _handleLoadMT(id) {
    const { app_id } = this.props
    if(!app_id) return
    mt.initialize(app_id)
  }

  _handleEvent() {
    const { app_id } = this.props
    if(!this._isProduction() || !app_id) return
    const args = Array.prototype.slice.call(arguments)
    mt[args[0]](...args.slice(1))
  }

}

export default Analytics
