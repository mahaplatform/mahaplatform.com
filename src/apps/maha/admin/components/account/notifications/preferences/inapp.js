import PropTypes from 'prop-types'
import React from 'react'

class InApp extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    notifications: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.bool,
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
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleToggle }>
          <div className="maha-preference-icon">
            { value ?
              <i className="fa fa-check-circle" /> :
              <i className="fa fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Display in-app notifications
            ( <span onClick={ this._handleDemo }>demo</span> )
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
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

  _handleDemo(e) {
    const { team } = this.context.admin
    e.stopPropagation()
    this.context.notifications.pushInApp({
      team,
      body: 'This is an in-app notification',
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

export default InApp
