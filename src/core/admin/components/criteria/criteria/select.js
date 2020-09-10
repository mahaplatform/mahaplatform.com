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
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    format: PropTypes.any,
    name: PropTypes.string,
    options: PropTypes.array,
    search: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
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
    const { operator } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body">
            { !_.includes(['$kn','$nkn'], operator) &&
              <Search { ...this._getSearch() } key={operator} />
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
      { value: '$nin', text: 'is not one of' },
      { value: '$kn', text: 'is known' },
      { value: '$nkn', text: 'is unknown' }
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
      deselectable: false,
      options,
      onChange: this._handleOperator
    }
  }

  _getSearch() {
    const { operator } = this.state
    const { endpoint, filter, format, name, search, text, value } = this.props
    return {
      defaultValue: this.state.value,
      endpoint,
      filter,
      format,
      label: name,
      multiple: _.includes(['$in','$nin'], operator),
      options: this._getOptions(),
      search,
      text: text || 'text',
      value: !endpoint ? (value || 'value') : null,
      onChange: this._handleUpdate
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { data, operator, value } = this.state
    const { code } = this.props
    if(value === null) this.props.onChange(null)
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
    if(_.includes(['$kn','$nkn'], operator)) {
      return this.setState({
        operator,
        data: null,
        value: true
      })
    }
    if(_.includes(['$eq','$neq'], operator)) {
      return this.setState({
        operator,
        data: null,
        value: ''
      })
    }
    this.setState({ operator })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

  _handleUpdate(selected) {
    const { endpoint, value, text } = this.props
    const { operator } = this.state
    const multiple = _.includes(['$in','$nin'], operator)
    const records = _.castArray(selected)
    const values = endpoint ? records.map(record => {
      return _.get(record, value)
    }) : records
    const data = endpoint ? records.map(record => ({
      value: _.get(record, value),
      text: _.get(record, text)
    })) : []
    this.setState({
      data: (multiple ? data : data[0]) || null,
      value: (multiple ? values : values[0]) || null
    })
  }

}

export default Select
