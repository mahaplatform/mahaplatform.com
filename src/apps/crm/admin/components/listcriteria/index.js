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
    field: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
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
    const { field } = this.props
    return field.comparisons || [
      { value: '$eq', text: 'is' },
      { value: '$neq', text: 'is not' },
      { value: '$in', text: 'is one of' },
      { value: '$nin', text: 'is not one of' }
    ]
  }

  _getOptions() {
    const { field } = this.props
    if(!field.options) return null
    return field.options.map(option => {
      return _.isString(option) ? { value: option, text: option } : option
    })
  }

  _getPanel() {
    const { value } = this.state
    const { field } = this.props
    return {
      title: field.name,
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
    const { value } = this.state
    const { field } = this.props
    return {
      defaultValue: value,
      endpoint: field.endpoint,
      filter: field.filter,
      options: this._getOptions(),
      value: !field.endpoint ? (field.value || 'value') : null,
      onChange: this._handleUpdate
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { data, operator, value } = this.state
    const { code} = this.props
    if(!value) return
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
    this.setState({ operator })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

  _handleUpdate(selected) {
    const { field } = this.props
    const { operator } = this.state
    const multiple = _.includes(['$in','$nin'], operator)
    const records = _.castArray(selected)
    const values = field.endpoint ? records.map(record => {
      return _.get(record, field.value)
    }) : records
    const data = field.endpoint ? records.map(record => ({
      value: _.get(record, field.value),
      text: _.get(record, field.text)
    })) : []
    this.setState({
      data: multiple ? data : data[0],
      value: multiple ? values : values[0]
    })
  }

}

export default ListCriteria
