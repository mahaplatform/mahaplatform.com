import PropTypes from 'prop-types'
import React from 'react'

class Mute extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    remind_me_week: true,
    remind_me_day: true
  }

  _handleChange = this._handleChange.bind(this)
  _handleToggleWeek = this._handleToggleWeek.bind(this)
  _handleToggleDay = this._handleToggleDay.bind(this)

  render() {
    const { remind_me_week, remind_me_day } = this.state
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleToggleWeek }>
          <div className="maha-preference-icon">
            { remind_me_week ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Remind me 1 week before this plan is due
          </div>
        </div>
        <div className="maha-preference" onClick={ this._handleToggleDay }>
          <div className="maha-preference-icon">
            { remind_me_day ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Remind me 1 day before this plan is due
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    const { defaultValue } = this.props
    if(defaultValue) this.setState(defaultValue)
    if(!defaultValue) this.props.onChange(this.state)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { remind_me_week, remind_me_week_amount, remind_me_day, remind_me_day_amount } = this.state
    if(remind_me_week !== prevState.remind_me_week) {
      this.props.onChange(this.state)
    }
    if(remind_me_week_amount !== prevState.remind_me_week_amount) {
      this.props.onChange(this.state)
    }
    if(remind_me_day !== prevState.remind_me_day) {
      this.props.onChange(this.state)
    }
    if(remind_me_day_amount !== prevState.remind_me_day_amount) {
      this.props.onChange(this.state)
    }
  }

  _handleChange(type, time) {
    this.setState({
      [type]: time
    })
  }

  _handleToggleWeek() {
    const { remind_me_week } = this.state
    this.setState({
      remind_me_week: !remind_me_week
    })
  }

  _handleToggleDay() {
    const { remind_me_day } = this.state
    this.setState({
      remind_me_day: !remind_me_day
    })
  }

}

export default Mute
