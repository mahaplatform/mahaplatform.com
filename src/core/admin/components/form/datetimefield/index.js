import DateField from '../datefield'
import TimeField from '../timefield'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class DateTimeField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  constructor(props) {
    super(props)
    const { defaultValue } = props
    this.state = {
      date: defaultValue ? moment(defaultValue).format('YYYY-MM-DD') : null,
      time: defaultValue ? moment(defaultValue).format('HH:mm:ss') : null
    }
  }

  render() {
    return (
      <div className="maha-datetimefield">
        <div className="maha-datetimefield-date">
          <DateField { ...this._getDateField() } />
        </div>
        <div className="maha-datetimefield-time">
          <TimeField { ...this._getTimeField() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { date, time } = this.state
    if(date !== prevState.date) {
      this._handleChange()
    }
    if(time !== prevState.time) {
      this._handleChange()
    }
  }

  _getDateField() {
    const { date } = this.state
    return {
      defaultValue: date,
      onChange: this._handleUpdate.bind(this, 'date')
    }
  }

  _getTimeField() {
    const { time } = this.state
    return {
      defaultValue: time,
      onChange: this._handleUpdate.bind(this, 'time')
    }
  }

  _handleChange() {
    const { date } = this.state
    const time = this.state.time || '00:00:00'
    this.props.onChange(`${date} ${time}`)
  }

  _handleUpdate(key, value) {
    this.setState({
      [key]: value
    })
  }

}

export default DateTimeField
