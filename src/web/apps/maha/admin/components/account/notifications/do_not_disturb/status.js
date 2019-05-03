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

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleChoose.bind(this, true) }>
          <div className="maha-preference-icon">
            { value === true ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Notifications are enabled
          </div>
        </div>
        <div className="maha-preference" onClick={ this._handleChoose.bind(this, false) }>
          <div className="maha-preference-icon">
            { value === false ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Notifications are paused
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

  _handleChoose(value) {
    this.setState({
      value
    })
  }

}

export default Status
