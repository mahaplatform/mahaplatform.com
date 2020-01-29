import AddressField from './addressfield'
import ProductField from './productfield'
import MoneyField from './moneyfield'
import Checkboxes from './checkboxes'
import RadioGroup from './radiogroup'
import PhoneField from './phonefield'
import FileField from './filefield'
import TextField from './textfield'
import DateField from './datefield'
import TimeField from './timefield'
import PropTypes from 'prop-types'
import TextArea from './textarea'
import Dropdown from './dropdown'
import Checkbox from './checkbox'
import Text from './text'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    error: PropTypes.string,
    field: PropTypes.object,
    index: PropTypes.number,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    htmlFor: null
  }

  render() {
    const { error, field } = this.props
    const { instructions, label } = field
    const { htmlFor } = this.state
    const Component = this._getComponent(field)
    return (
      <div className={ this._getClass() }>
        { label && <label htmlFor={ htmlFor }>{ label }</label> }
        { instructions &&
          <div className="field-instructions">
            { instructions }
          </div>
        }
        <Component { ...this._getField() } />
        { error &&
          <div className="field-error">
            { error }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      htmlFor: _.random(100000000, 999999999).toString(36)
    })
  }

  _getClass() {
    const { error, field, index } = this.props
    const classes = ['field',`field-${index}`]
    if(field.required) classes.push('required')
    if(error) classes.push('error')
    return classes.join(' ')
  }

  _getComponent(field) {
    if(field.type === 'contactfield' && field.contactfield) return this._getComponent(field.contactfield)
    if(field.type === 'addressfield') return AddressField
    if(field.type === 'checkboxes') return Checkboxes
    if(field.type === 'checkbox') return Checkbox
    if(field.type === 'datefield') return DateField
    if(field.type === 'dropdown') return Dropdown
    if(field.type === 'filefield') return FileField
    if(field.type === 'moneyfield') return MoneyField
    if(field.type === 'phonefield') return PhoneField
    if(field.type === 'productfield') return ProductField
    if(field.type === 'radiogroup') return RadioGroup
    if(field.type === 'text') return Text
    if(field.type === 'textarea') return TextArea
    if(field.type === 'timefield') return TimeField
    return TextField
  }

  _getField() {
    const { code, field, status, onChange, onReady, onValidate } = this.props
    const { htmlFor } = this.state
    return {
      code,
      htmlFor,
      ...field,
      status,
      onChange,
      onReady,
      onValidate
    }
  }

}

export default Field
