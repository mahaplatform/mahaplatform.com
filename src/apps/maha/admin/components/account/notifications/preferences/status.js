import PropTypes from 'prop-types'
import React from 'react'

class Status extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.bool,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    value: true
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleToggle }>
          <div className="maha-preference-icon">
            { value === true ?
              <i className="fa fa-check-circle" /> :
              <i className="fa fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Notifications are enabled
          </div>
        </div>
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

  _handleToggle() {
    const { value } = this.state
    this.setState({
      value: !value
    })
  }

}

export default Status
