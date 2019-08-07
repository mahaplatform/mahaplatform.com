import PropTypes from 'prop-types'
import Button from '../../button'
import Search from '../../search'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class DateRange extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    field: PropTypes.object,
    mode: PropTypes.string,
    onDone: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    value: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="maha-criterion-form">
        <div className="maha-criterion-form-body">
          <Search { ...this._getSearch() } />
        </div>
        <div className="maha-criterion-form-footer">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  _getButton() {
    const { mode } = this.props
    return {
      label: mode === 'add' ? 'Add Criteria' : 'Update Criteria',
      color: 'lightgrey',
      handler: this._handleDone
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
      title: field.label,
      color: 'lightgrey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getSearch() {
    const { value } = this.state
    const { field } = this.props
    return {
      defaultValue: value,
      format: field.format,
      label: field.label,
      multiple: field.multiple,
      options: this._getOptions(field.include),
      text: field.text,
      value: field.value,
      onChange: this._handleChange
    }
  }

  _handleChange(value) {
    this.setState({ value })
  }

  _handleDone() {
    const { value } = this.state
    this.props.onDone({ $eq: value })
  }

  _handleSet(defaultValue) {
    const value = defaultValue.$eq
    this.setState({ value })
  }

}

export default DateRange
