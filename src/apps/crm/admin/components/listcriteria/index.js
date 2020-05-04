import { ModalPanel, RadioGroup } from 'maha-admin'
import CheckboxesField from '../checkboxesfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class ListCriteria extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    comparisons: PropTypes.array,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    options: PropTypes.array,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {
    multiple: false
  }

  state = {
    operator: null,
    value: null,
    data: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleOperator = this._handleOperator.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body">
            <CheckboxesField { ...this._getCheckboxesField() } />
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
    if(!_.isEqual(value, prevState.value)) {
      this._handleChange()
    }
  }

  _getOperators() {
    const { comparisons } = this.props
    return comparisons || [
      { value: '$eq', text: 'is' },
      { value: '$neq', text: 'is not' },
      { value: '$in', text: 'is one of' },
      { value: '$nin', text: 'is not one of' }
    ]
  }

  _getOptions() {
    const { options } = this.props
    if(!options) return null
    return options.map(option => {
      return _.isString(option) ? { value: option, text: option } : option
    })
  }

  _getPanel() {
    const { value } = this.state
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
        disabled: value === null,
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

  _getCheckboxesField() {
    const { endpoint, filter, multiple, text, value } = this.props
    return {
      defaultValue: this.state.value ? _.castArray(this.state.value) : null,
      endpoint,
      filter,
      multiple,
      options: this._getOptions(),
      value: !endpoint ? (value || 'value') : null,
      text,
      onChange: this._handleUpdate
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { data, operator, value } = this.state
    const { code, multiple } = this.props
    if(!value) return
    this.props.onChange({
      code,
      operator,
      value: multiple ? value : value[0],
      data: multiple ? data : data[0]
    })
  }

  _handleDone() {
    const { data, operator, value } = this.state
    const { code, multiple } = this.props
    this.props.onDone({
      code,
      operator,
      value: multiple ? value : value[0],
      data: multiple ? data : data[0]
    })
  }

  _handleOperator(operator) {
    this.setState({ operator })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

  _handleUpdate(selected) {
    const { endpoint, value, text } = this.props
    const records = _.castArray(selected)
    const values = endpoint ? records.map(record => {
      return _.get(record, value)
    }) : records
    const data = endpoint ? records.map(record => ({
      value: _.get(record, value),
      text: _.get(record, text)
    })) : []
    this.setState({
      data: data,
      value: values
    })
  }

}

export default ListCriteria
