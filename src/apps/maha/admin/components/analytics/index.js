
import PropTypes from 'prop-types'
import ga from 'react-ga'
import React from 'react'

class Admin extends React.Component {

  static childContextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  enabled = process.env.GOOGLE_TRACKING_ID.length > 0

  _handleTrack = this._handleTrack.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    if(!this.enabled) return
    ga.initialize(process.env.GOOGLE_TRACKING_ID)
  }

  getChildContext() {
    return {
      analytics: {
        track: this._handleTrack
      }
    }
  }

  _handleTrack(category, action, extra = {}) {
    const data = {
      category,
      action,
      ...extra
    }
    if(this.enabled) return ga.event(data)
  }

}

export default Admin
