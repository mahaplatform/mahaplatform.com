import PropTypes from 'prop-types'
import ga from 'react-ga'
import React from 'react'
import mt from './mt'

class Analytics extends React.Component {

  static childContextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    site: PropTypes.object,
    children: PropTypes.any
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    if(!this._isProduction()) return
    this._handleLoadGA()
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
        trackMaha: this._handleEvent.bind(this, 'trackMaha'),
        trackPageUnload: this._handleEvent.bind(this, 'trackPageUnload'),
        updatePageActivity: this._handleEvent.bind(this, 'updatePageActivity')
      }
    }
  }

  _isProduction() {
    return process.env.NODE_ENV === 'production'
  }

  _handleLoadGA(id) {
    const { ga_tracking_id } = this.props.site
    if(!ga_tracking_id) return
    ga.initialize(ga_tracking_id)
  }

  _handleLoadMT(id) {
    const { mt_tracking_id } = this.props.site
    if(!mt_tracking_id) return
    mt.initialize(mt_tracking_id)
  }

  _handleEvent() {
    const { ga_tracking_id, mt_tracking_id } = this.props.site
    if(!this._isProduction()) return
    const args = Array.prototype.slice.call(arguments)
    if(mt_tracking_id) mt[args[0]](...args.slice(1))
    if(ga_tracking_id) ga[args[0]](...args.slice(1))
  }

}

export default Analytics
