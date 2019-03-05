import PropTypes from 'prop-types'
import React from 'react'

class Email extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    value: 'ondemand'
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleChoose.bind(this, 'none') }>
          <div className="maha-preference-icon">
            { value === 'none' ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            <strong>Do Nothing</strong><br />
            Please do not send me any notifications via email
          </div>
        </div>
        <div className="maha-preference" onClick={ this._handleChoose.bind(this, 'ondemand') }>
          <div className="maha-preference-icon">
            { value === 'ondemand' ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            <strong>On Demand</strong><br />
            Send me an email whenever I miss a notification
          </div>
        </div>
        <div className="maha-preference" onClick={ this._handleChoose.bind(this, 'digest') }>
          <div className="maha-preference-icon">
            { value === 'digest' ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            <strong>Daily Digest</strong><br />
            Send me a daily email with all of my missed notifcations from the previous day
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.setState({
      value: defaultValue
    })
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

export default Email
