import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'
import AddressField from './addressfield'
import Checkbox from './checkbox'
import CheckboxGroup from './select/checkbox_group'
import ColorField from './colorfield'
import DateField from './datefield'
import Dropdown from './dropdown'
import EmailField from './emailfield'
import Hidden from './hidden'
import FileField from './filefield'
import Lookup from './lookup'
import Lookup2 from './lookup2'
import MoneyField from './moneyfield'
import NumberField from './numberfield'
import Password from './password'
import PhoneField from './phonefield'
import RadioGroup from './select/radio_group'
import TableField from './tablefield'
import Text from './text'
import TextArea from './textarea'
import TextField from './textfield'
import TimeField from './timefield'
import ToggleList from './toggle_list'
import VideoField from './videofield'

class Control extends React.Component {

  static propTypes = {
    type: PropTypes.string,
    options: PropTypes.array
  }

  static defaultProps = {
    type: 'textfield',
    options: []
  }

  render() {
    return (
      <div className="maha-control">
        { React.createElement(this._getElement(), this.props) }
      </div>
    )
  }

  _getElement() {
    const { type } = this.props
    if(!_.isString(type)) return type
    if(type === 'addressfield') return AddressField
    if(type === 'checkbox') return Checkbox
    if(type === 'checkboxgroup') return CheckboxGroup
    if(type === 'colorfield') return ColorField
    if(type === 'datefield') return DateField
    if(type === 'dropdown') return Dropdown
    if(type === 'emailfield') return EmailField
    if(type === 'hidden') return Hidden
    if(type === 'filefield') return FileField
    if(type === 'lookup') return Lookup
    if(type === 'lookup2') return Lookup2
    if(type === 'moneyfield') return MoneyField
    if(type === 'numberfield') return NumberField
    if(type === 'password') return Password
    if(type === 'phonefield') return PhoneField
    if(type === 'radiogroup') return RadioGroup
    if(type === 'tablefield') return TableField
    if(type === 'text') return Text
    if(type === 'textarea') return TextArea
    if(type === 'textfield') return TextField
    if(type === 'timefield') return TimeField
    if(type === 'togglelist') return ToggleList
    if(type === 'videofield') return VideoField
    return null
  }

}

export default Control
