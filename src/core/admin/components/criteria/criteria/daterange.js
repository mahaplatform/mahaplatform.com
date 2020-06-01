import RadioGroup from '../../form/select/radio_group'
import DateField from '../../form/datefield'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Search from '../../search'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class DateRange extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.object,
    name: PropTypes.string,
    format: PropTypes.any,
    include: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {
    include: ['last','this','next']
  }

  state = {
    operator: '$eq',
    value: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleOperator = this._handleOperator.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { operator } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body">
            { _.includes(['$dr','$ndr'], operator) &&
              <Search { ...this._getSearch() } />
            }
            { _.includes(['$eq','$lt','$gt'], operator) &&
              <div className="maha-criterion-form-panel">
                <div className="maha-criterion-field">
                  <DateField { ...this._getDateField() } />
                </div>
              </div>
            }
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
    const { operator, value } = this.state
    if(operator !== prevState.operator) {
      this._handleChange()
    }
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  getChildContext() {
    const { onPop, onPush } = this.props
    return {
      form: {
        push: onPush,
        pop: onPop
      }
    }
  }

  _getDateField() {
    return {
      onChange: this._handleUpdate
    }
  }

  _getDescription(quantity, unit) {
    const start = moment().add(quantity, unit).startOf(unit)
    const end = moment().add(quantity, unit).endOf(unit)
    const startdate = (start.format('YY') !== end.format('YY')) ? start.format('MMM D, YYYY') :  start.format('MMM D')
    const enddate =  (start.format('MM') !== end.format('MM')) ? end.format('MMM D, YYYY') : end.format('D, YYYY')
    return `${startdate} - ${enddate}`
  }

  _getOperators() {
    return [
      { value: '$eq', text: 'is' },
      { value: '$lt', text: 'is before' },
      { value: '$gt', text: 'is after' },
      { value: '$dr', text: 'is within daterange' },
      { value: '$ndr', text: 'is not within daterange' },
      { value: '$kn', text: 'is known' },
      { value: '$nkn', text: 'is unknown' }
    ]
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
    const { name } = this.props
    return {
      title: name,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      color: 'grey',
      buttons: [{
        label: 'Add Criteria',
        color: 'blue',
        handler: this._handleDone
      }]
    }
  }

  _getRadioGroup() {
    const options = this._getOperators()
    const { operator } = this.state
    return {
      defaultValue: operator || options[0].value,
      options,
      onChange: this._handleOperator
    }
  }

  _getSearch() {
    const { format, include, name, text, value } = this.props
    return {
      defaultValue: this.state.value,
      format,
      label: name,
      multiple: false,
      options: this._getOptions(include),
      search: false,
      text: text || 'text',
      value: value || 'value',
      onChange: this._handleUpdate
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { data, operator, value } = this.state
    const { code } = this.props
    this.props.onChange({
      code,
      operator,
      value,
      data
    })
  }

  _handleDone() {
    const { data, operator, value } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator,
      value,
      data
    })
  }

  _handleOperator(operator) {
    this.setState({
      operator,
      data: null,
      value: ''
    })
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
