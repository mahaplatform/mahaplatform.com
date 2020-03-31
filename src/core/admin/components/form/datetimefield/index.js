import DateField from '../datefield'
import TimeField from '../timeField'
import PropTypes from 'prop-types'
import React from 'react'

class DateTimeField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    date: null,
    time: null
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
    return {
      onChange: this._handleUpdate.bind(this, 'date')
    }
  }

  _getTimeField() {
    return {
      onChange: this._handleUpdate.bind(this, 'time')
    }
  }

  _handleChange() {
    const { date, time } = this.state
    this.props.onChange(`${date} ${time}`)
  }

  _handleUpdate(key, value) {
    this.setState({
      [key]: value
    })
  }

}

export default DateTimeField
