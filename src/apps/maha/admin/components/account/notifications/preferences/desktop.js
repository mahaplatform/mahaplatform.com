import { connect } from 'react-redux'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Desktop extends React.Component {

  static contextTypes = {
    notifications: PropTypes.object,
    push: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.bool,
    permission: PropTypes.string,
    preferences: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    value: true
  }

  _handleDemo = this._handleDemo.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { value } = this.state
    const { permission } = this.props
    return (
      <div className="maha-desktop">
        { permission === 'unknown' &&
          <Button { ...this._getEnable() } />
        }
        { permission === 'denied' &&
          <div className="maha-desktop-panel denied">
            <div className="maha-desktop-panel-label">
              <strong>Desktop Notifications Blocked</strong><br />
              You&apos;ve disallowed desktop notifications on this device.
              If you want to enable them in the future, you&apos;ll need
              to open your browser&apos;s preferences to change that.
            </div>
          </div>
        }
        { permission === 'granted' &&
          <div className="maha-preferences">
            <div className="maha-preference" onClick={ this._handleToggle }>
              <div className="maha-preference-icon">
                { value ?
                  <i className="fa fa-fw fa-check-circle" /> :
                  <i className="fa fa-fw fa-circle-o" />
                }
              </div>
              <div className="maha-preference-label">
                Send desktop notifications
                ( <span onClick={ this._handleDemo }>demo</span> )
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    const value = defaultValue === true
    this.setState({ value })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this.props.onChange(value)
    }
  }

  _getEnable() {
    return {
      className: 'ui blue button',
      icon: 'bell',
      label: 'Enable desktop notifications',
      handler: this.context.push.requestPermission
    }
  }

  _handleDemo(e) {
    e.stopPropagation()
    this.context.notifications.pushDesktop({
      title: 'Desktop Notification',
      body: 'This is a desktop notification',
      sound: null
    })
  }

  _handleToggle() {
    const { value } = this.state
    this.setState({
      value: !value
    })
  }

}

const mapStateToProps = (state, props) => ({
  permission: state.maha.push.permission
})

export default connect(mapStateToProps)(Desktop)
