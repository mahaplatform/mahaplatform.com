import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Chooser extends React.Component {

  static propTypes = {
    value: PropTypes.object,
    onChoose: PropTypes.func
  }

  state = {
    month: null,
    year: null
  }

  _handlePrevious = this._handlePrevious.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    const { month, year } = this.state
    if(month === null || year === null) return null
    const { value } = this.props
    const current = { month, year, day: 1 }
    const start = moment(current).startOf('month')
    const end = moment(current).endOf('month')
    const date = moment(current).startOf('week').subtract(1, 'day')
    const today = moment()
    return (
      <div className="maha-datefield-chooser">
        <div className="maha-datefield-month">
          <div className="maha-datefield-header">
            <div className="maha-datefield-previous" onClick={ this._handlePrevious }>
              <i className="fa fa-fw fa-chevron-left" />
            </div>
            <div className="maha-datefield-title">
              { moment(current).format('MMMM YYYY').toUpperCase() }
            </div>
            <div className="maha-datefield-next" onClick={ this._handleNext }>
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
          <div className="maha-datefield-weekdays">
            <div className="maha-datefield-weekday">Su</div>
            <div className="maha-datefield-weekday">Mo</div>
            <div className="maha-datefield-weekday">Tu</div>
            <div className="maha-datefield-weekday">We</div>
            <div className="maha-datefield-weekday">Th</div>
            <div className="maha-datefield-weekday">Fr</div>
            <div className="maha-datefield-weekday">Sa</div>
          </div>
          { Array(6).fill(0).map((week, i) => (
            <div key={`datefield_week_${i}`} className="maha-datefield-week">
              { Array(7).fill(0).map((day, j) => {
                date.add('1', 'days')
                const classes = ['maha-datefield-day']
                if(date.isBefore(start, 'day') || date.isAfter(end, 'day')) classes.push('notmonth')
                if(date.isSame(value, 'day')) classes.push('selected')
                if(date.isSame(today, 'day')) classes.push('today')
                return (
                  <div key={`datefield_day_${i}_${j}`} className={ classes.join(' ')} onClick={ this._handleChoose.bind(this, moment(date)) }>
                    { date.format('DD') }
                  </div>
                )
              }) }
            </div>
          )) }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { value } = this.props
    const current = value || moment()
    this.setState({
      month: parseInt(current.format('MM')) - 1,
      year: parseInt(current.format('YYYY'))
    })
  }

  _handleChoose(value) {
    this.props.onChoose(value)
  }

  _handlePrevious() {
    const { month, year } = this.state
    this.setState({
      month: month !== null ? (month === 0 ? 11 : month - 1) : null,
      year: year !== null ? (month === 0 ? year - 1 : year) : null
    })
  }

  _handleNext() {
    const { month, year } = this.state
    this.setState({
      month: month !== null ? (month === 11 ? 0 : month + 1) : null,
      year: year !== null ? (month === 11 ? year + 1 : year) : null
    })
  }

}

export default Chooser
