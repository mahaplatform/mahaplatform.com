import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Chooser extends React.Component {

  static propTypes = {
    month: PropTypes.number,
    value: PropTypes.any,
    year: PropTypes.number,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onSetCurrent: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { month, value, year } = this.props
    const current = { month, year, day: '01'}
    const start = moment(current).startOf('month')
    const end = moment(current).endOf('month')
    const date = moment(current).startOf('week').subtract(1, 'day')
    const today = moment()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-datefield-chooser">
          <div className="maha-datefield-month">
            <div className="maha-datefield-header">
              <div className="maha-datefield-previous" onClick={ this._handlePrevious.bind(this)}>
                <i className="fa fa-fw fa-chevron-left" />
              </div>
              <div className="maha-datefield-title">
                { moment(current).format('MMMM YYYY').toUpperCase() }
              </div>
              <div className="maha-datefield-next" onClick={ this._handleNext.bind(this)}>
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
            <div className="maha-datefield-weekdays">
              <div className="maha-datefield-weekday">Sun</div>
              <div className="maha-datefield-weekday">Mon</div>
              <div className="maha-datefield-weekday">Tue</div>
              <div className="maha-datefield-weekday">Wed</div>
              <div className="maha-datefield-weekday">Thu</div>
              <div className="maha-datefield-weekday">Fri</div>
              <div className="maha-datefield-weekday">Sat</div>
            </div>
            { [...Array(6)].map((week, i) => (
              <div key={`datefield_week_${i}`} className="maha-datefield-week">
                { [...Array(7)].map((day, j) => {
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
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Date',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleChoose(value) {
    const { onChoose, onSetCurrent } = this.props
    onSetCurrent(parseInt(value.format('MM')) - 1, parseInt(value.format('YYYY')))
    onChoose(value)
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handlePrevious() {
    this.props.onPrevious()
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  ...state.maha.datefield[props.cid]
})

export default connect(mapStateToProps)(Chooser)
