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

  _handleEvent = this._handleEvent.bind(this)
  _handleView = this._handleView.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    if(!this._isProduction()) return
    // this._handleLoadGA()
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

  _handleEvent(category, action, extra = {}) {
    if(!this._isProduction()) return
    const { ga_tracking_id, mt_tracking_id } = this.props.site
    if(ga_tracking_id) {
      ga.event({
        category,
        action,
        ...extra
      })
    }
    if(mt_tracking_id) {
      mt.event({
        category,
        action,
        ...extra
      })
    }
  }

  _handleView() {
    if(!this._isProduction()) return
    const { ga_tracking_id, mt_tracking_id } = this.props.site
    const page = window.location.pathname
    if(ga_tracking_id) {
      ga.set({ page })
      ga.pageview(page)
    }
    if(mt_tracking_id) {
      mt.pageview(page)
    }
  }

}

export default Analytics
