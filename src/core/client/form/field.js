import AddressField from './addressfield'
import MoneyField from './moneyfield'
import Checkboxes from './checkboxes'
import RadioGroup from './radiogroup'
import PhoneField from './phonefield'
import EmailField from './emailfield'
import FileField from './filefield'
import TextField from './textfield'
import DateField from './datefield'
import TimeField from './timefield'
import PropTypes from 'prop-types'
import TextArea from './textarea'
import DropDown from './dropdown'
import Checkbox from './checkbox'
import React from 'react'
import Text from './text'
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
    if(field.type === 'addressfield') return AddressField
    if(field.type === 'checkboxes') return Checkboxes
    if(field.type === 'checkbox') return Checkbox
    if(field.type === 'datefield') return DateField
    if(field.type === 'DropDown') return DropDown
    if(field.type === 'filefield') return FileField
    if(field.type === 'moneyfield') return MoneyField
    if(field.type === 'phonefield') return PhoneField
    if(field.type === 'radiogroup') return RadioGroup
    if(field.type === 'text') return Text
    if(field.type === 'textarea') return TextArea
    if(field.type === 'timefield') return TimeField
    if(field.type === 'emailfield') return EmailField
    return TextField
  }

  _getField() {
    const { code, field, index, status, token, onChange, onReady, onValidate } = this.props
    const { htmlFor } = this.state
    return {
      code,
      htmlFor,
      ..._.omit(field, ['code','name']),
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