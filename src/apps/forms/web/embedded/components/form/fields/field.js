import {
  AddressField,
  MoneyField,
  Checkboxes,
  RadioGroup,
  PhoneField,
  EmailField,
  FileField,
  TextField,
  DateField,
  TimeField,
  TextArea,
  DropDown,
  Checkbox,
  Hidden,
  Text
} from '@client'
import PaymentField from './paymentfield'
import ProductField from './productfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    error: PropTypes.string,
    field: PropTypes.object,
    index: PropTypes.number,
    status: PropTypes.string,
    token: PropTypes.string,
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
    if(field.type === 'hidden') return <Component { ...this._getField() } />
    return (
      <div className={ this._getClass() }>
        { label && <label htmlFor={ htmlFor }>{ label }</label> }
        { instructions &&
          <div className="field-instructions" dangerouslySetInnerHTML={{ __html: instructions }} />
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
    if(error) classes.push('field-invalid')
    if(field.required) classes.push('required')
    return classes.join(' ')
  }

  _getComponent(field) {
    if(field.type === 'contactfield' && field.contactfield) return this._getComponent(field.contactfield)
    if(field.type === 'addressfield') return AddressField
    if(field.type === 'checkboxgroup') return Checkboxes
    if(field.type === 'checkboxes') return Checkboxes
    if(field.type === 'checkbox') return Checkbox
    if(field.type === 'datefield') return DateField
    if(field.type === 'paymentfield') return PaymentField
    if(field.type === 'dropdown') return DropDown
    if(field.type === 'filefield') return FileField
    if(field.type === 'moneyfield') return MoneyField
    if(field.type === 'phonefield') return PhoneField
    if(field.type === 'productfield') return ProductField
    if(field.type === 'radiogroup') return RadioGroup
    if(field.type === 'text') return Text
    if(field.type === 'textarea') return TextArea
    if(field.type === 'timefield') return TimeField
    if(field.type === 'emailfield') return EmailField
    if(field.type === 'hidden') return Hidden
    return TextField
  }

  _getField() {
    const { code, index, status, token, onChange, onReady, onValidate } = this.props
    const { htmlFor } = this.state
    const field = {
      ...this.props.field.contactfield || {},
      ...this.props.field
    }
    return {
      code,
      htmlFor,
      ..._.omit(field, ['code','name','label','contactfield']),
      name: _.get(field, 'name.value'),
      status,
      tabIndex: index + 1,
      token,
      onChange,
      onReady,
      onValidate
    }
  }

}

export default Field
