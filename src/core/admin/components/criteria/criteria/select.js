import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Search from '../../search'
import React from 'react'
import _ from 'lodash'

class Select extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    comparisons: PropTypes.array,
    field: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    operator: '$eq',
    value: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

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


  _getPanel() {
    const { field } = this.props
    return {
      title: field.name,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      color: 'grey',
      buttons: [{
        label: 'Done',
        color: 'grey',
        handler: this._handleDone
      }]
    }
  }

  _getRadioGroup() {
    const { field } = this.props
    const { operator } = this.state
    return {
      defaultValue: operator,
      options: field.comparisons || [
        { value: '$eq', text: 'is' },
        { value: '$neq', text: 'is not' },
        { value: '$in', text: 'is one of' },
        { value: '$nin', text: 'is not one of' }
      ],
      onChange: this._handleUpdate.bind(this, 'operator')
    }
  }

  _getSearch() {
    const { operator, value } = this.state
    const { field } = this.props
    return {
      defaultValue: value,
      endpoint: field.endpoint,
      format: field.format,
      label: field.name,
      multiple: _.includes(['$in','$nin'], operator),
      options: field.options,
      text: field.text,
      value: field.value,
      onChange: this._handleUpdate.bind(this, 'value')
    }
  }

  _handleUpdate(key, value) {
    this.setState({ [key]: value })
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { operator, value } = this.state
    if(value) this.props.onChange({ [operator]: value })
  }

  _handleDone() {
    const { operator, value } = this.state
    this.props.onDone({ [operator]: value })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

}

export default Select