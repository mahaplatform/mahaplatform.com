import PropTypes from 'prop-types'
import Times from './times'
import moment from 'moment'
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
    mute_evenings: true,
    mute_evenings_end_time: '18:00',
    mute_evenings_start_time: '9:00',
    mute_weekends: true
  }

  _handleChange = this._handleChange.bind(this)
  _handleToggleMuteEvenings = this._handleToggleMuteEvenings.bind(this)
  _handleToggleMuteWeekends = this._handleToggleMuteWeekends.bind(this)

  render() {
    const { mute_evenings, mute_evenings_end_time, mute_evenings_start_time, mute_weekends } = this.state
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleToggleMuteEvenings }>
          <div className="maha-preference-icon">
            { mute_evenings ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Please do not send me any notifications between <span onClick={ this._handleLookup.bind(this, 'start') }>
              { moment(`2018-01-01 ${mute_evenings_start_time}`, 'YYYY-MM-DD H:mm').format('h:mm A') }
            </span> and <span onClick={ this._handleLookup.bind(this, 'end') }>
              { moment(`2018-01-01 ${mute_evenings_end_time}`, 'YYYY-MM-DD H:mm').format('h:mm A') }
            </span>
          </div>
        </div>
        <div className="maha-preference" onClick={ this._handleToggleMuteWeekends }>
          <div className="maha-preference-icon">
            { mute_weekends ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Do not send me any notifications on weekends
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    const { defaultValue } = this.props
    if(defaultValue) this.setState(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { mute_evenings, mute_evenings_end_time, mute_evenings_start_time, mute_weekends } = this.state
    if(mute_evenings !== prevState.mute_evenings) {
      this.props.onChange(this.state)
    }
    if(mute_evenings_end_time !== prevState.mute_evenings_end_time) {
      this.props.onChange(this.state)
    }
    if(mute_evenings_start_time !== prevState.mute_evenings_start_time) {
      this.props.onChange(this.state)
    }
    if(mute_weekends !== prevState.mute_weekends) {
      this.props.onChange(this.state)
    }
  }

  _getTimes(type) {
    return {
      defaultValue: this.state[`mute_evenings_${type}_time`],
      type,
      onDone: this._handleChange
    }
  }

  _handleChange(type, time) {
    this.setState({
      [`mute_evenings_${type}_time`]: time
    })
  }

  _handleLookup(type, e) {
    e.stopPropagation()
    this.context.form.push(Times, this._getTimes.bind(this, type))
  }

  _handleToggleMuteEvenings() {
    const { mute_evenings } = this.state
    this.setState({
      mute_evenings: !mute_evenings
    })
  }

  _handleToggleMuteWeekends() {
    const { mute_weekends } = this.state
    this.setState({
      mute_weekends: !mute_weekends
    })
  }

}

export default Mute
