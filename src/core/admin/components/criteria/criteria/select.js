import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Search from '../../search'
import React from 'react'
import _ from 'lodash'

class Select extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    comparisons: PropTypes.array,
    field: PropTypes.object,
    parent: PropTypes.string,
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
            <Search { ...this._getSearch() } />
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
    if(!_.isEqual(value !== prevState.value)) {
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

  _getSearch() {
    const { operator, value } = this.state
    const { field } = this.props
    return {
      defaultValue: value,
      endpoint: field.endpoint,
      filter: field.filter,
      format: field.format,
      label: field.name,
      multiple: _.includes(['$in','$nin'], operator),
      options: field.options,
      text: field.text,
      onChange: this._handleUpdate
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { data, operator, value } = this.state
    const { code, field, parent } = this.props
    if(!value) return
    this.props.onChange({
      code,
      parent,
      field: field.key,
      operator,
      value,
      data
    })
  }

  _handleDone() {
    const { data, operator, value } = this.state
    const { code, field, parent } = this.props
    this.props.onDone({
      code,
      parent,
      field: field.key,
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
    const values = records.map(record => {
      return _.get(record, field.value)
    })
    const data = records.map(record => ({
      value: _.get(record, field.value),
      text: _.get(record, field.text)
    }))
    this.setState({
      data: multiple ? data : data[0],
      value: multiple ? values : values[0]
    })
  }

}

export default Select
