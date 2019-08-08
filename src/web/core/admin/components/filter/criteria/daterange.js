import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Buttons from '../../buttons'
import Search from '../../search'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class DateRange extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    field: PropTypes.object,
    mode: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    value: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-body">
            <Search { ...this._getSearch() } />
          </div>
          <div className="maha-criterion-form-footer">
            <Buttons { ...this._getButtons() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getButtons() {
    const { mode } = this.props
    return {
      buttons: [{
        label: 'Cancel',
        color: 'lightgrey',
        handler: this._handleCancel
      },{
        label: mode === 'add' ? 'Add Criteria' : 'Update Criteria',
        color: 'blue',
        handler: this._handleDone
      }]
    }
  }

  _getDescription(quantity, unit) {
    const start = moment().add(quantity, unit).startOf(unit)
    const end = moment().add(quantity, unit).endOf(unit)
    const startdate = (start.format('YY') !== end.format('YY')) ? start.format('MMM D, YYYY') :  start.format('MMM D')
    const enddate =  (start.format('MM') !== end.format('MM')) ? end.format('MMM D, YYYY') : end.format('D, YYYY')
    return `${startdate} - ${enddate}`
  }

  _getOptions(include) {
    const options = []
    if(_.includes(include, 'this')) options.push({ value: 'this_week', description: this._getDescription(0, 'week'), text: 'This Week' })
    if(_.includes(include, 'last')) options.push({ value: 'last_week', description: this._getDescription(-1, 'week'), text: 'Last Week' })
    if(_.includes(include, 'next')) options.push({ value: 'next_week', description: this._getDescription(1, 'week'), text: 'Next Week' })
    if(_.includes(include, 'this')) options.push({ value: 'this_month', description: this._getDescription(0, 'month'), text: 'This Month' })
    if(_.includes(include, 'last')) options.push({ value: 'last_month', description: this._getDescription(-1, 'month'), text: 'Last Month' })
    if(_.includes(include, 'next')) options.push({ value: 'next_month', description: this._getDescription(1, 'month'), text: 'Next Month' })
    if(_.includes(include, 'this')) options.push({ value: 'this_quarter', description: this._getDescription(0, 'quarter'), text: 'This Quarter' })
    if(_.includes(include, 'last')) options.push({ value: 'last_quarter', description: this._getDescription(-1, 'quarter'), text: 'Last Quarter' })
    if(_.includes(include, 'next')) options.push({ value: 'next_quarter', description: this._getDescription(1, 'quarter'), text: 'Next Quarter' })
    if(_.includes(include, 'this')) options.push({ value: 'this_year', description: this._getDescription(0, 'year'), text: 'This Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_year', description: this._getDescription(-1, 'year'), text: 'Last Year' })
    if(_.includes(include, 'next')) options.push({ value: 'next_year', description: this._getDescription(1, 'year'), text: 'Next Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_30', description: this._getDescription(-1, 'year'), text: 'Last 30 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_30', description: this._getDescription(1, 'year'), text: 'Next 30 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_60', description: this._getDescription(-1, 'year'), text: 'Last 60 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_60', description: this._getDescription(1, 'year'), text: 'Next 60 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_90', description: this._getDescription(-1, 'year'), text: 'Last 90 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_90', description: this._getDescription(1, 'year'), text: 'Next 90 Days' })
    options.push({ value: 'ytd', description: this._getDescription(1, 'year'), text: 'Year to Date' })
    options.push({ value: 'ltd', description: this._getDescription(1, 'year'), text: 'Life to Date' })
    return options
  }

  _getPanel() {
    const { field } = this.props
    return {
      title: field.name,
      color: 'lightgrey'
    }
  }

  _getSearch() {
    const { value } = this.state
    const { field } = this.props
    console.log(value)
    return {
      defaultValue: value,
      format: field.format,
      label: field.name,
      multiple: false,
      options: this._getOptions(field.include),
      text: field.text,
      value: field.value,
      onChange: this._handleUpdate
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange({ $dr: value })
  }

  _handleDone() {
    const { value } = this.state
    this.props.onDone({ $dr: value })
  }

  _handleSet(defaultValue) {
    const value = defaultValue.$eq
    this.setState({ value })
  }

  _handleUpdate(value) {
    this.setState({ value })
  }

}

export default DateRange
