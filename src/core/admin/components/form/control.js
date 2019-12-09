import AssignmentField from './assignmentfield'
import AttachmentField from './attachmentfield'
import AddressField from './addressfield'
import Checkbox from './checkbox'
import CheckboxGroup from './select/checkbox_group'
import ColorField from './colorfield'
import CriteriaField from './criteriafield'
import DateField from './datefield'
import Dropdown from './dropdown'
import EmailField from './emailfield'
import FileField from './filefield'
import FontFamilyField from './fontfamilyfield'
import FontSizeField from './fontsizefield'
import Hidden from './hidden'
import HtmlField from './htmlfield'
import LinkField from './linkfield'
import Lookup from './lookup'
import Lookup2 from './lookup2'
import MoneyField from './moneyfield'
import NumberField from './numberfield'
import Password from './password'
import ProfileField from './profilefield'
import PhoneField from './phonefield'
import PhoneNumberField from './phonenumberfield'
import RadioGroup from './select/radio_group'
import Range from './range'
import Rating from './rating'
import Submit from './submit'
import TableField from './tablefield'
import Text from './text'
import TextArea from './textarea'
import TextField from './textfield'
import TimeField from './timefield'
import ToggleList from './toggle_list'
import VideoField from './videofield'
import PropTypes from 'prop-types'
import Checkit from 'checkit'
import React from 'react'
import _ from 'lodash'

class Control extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    field: PropTypes.object,
    status: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func,
    onValid: PropTypes.func
  }

  onValidate = null

  _handleReady = this._handleReady.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const Component = this._getElement()
    return (
      <div className="maha-control">
        <Component {...this._getProps() } />
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'validating') this.onValidate()
    }
  }

  _getElement() {
    const { field } = this.props
    const type = field.type || 'textfield'
    if(!_.isString(type)) return type
    if(type === 'assignmentfield') return AssignmentField
    if(type === 'attachmentfield') return AttachmentField
    if(type === 'addressfield') return AddressField
    if(type === 'checkbox') return Checkbox
    if(type === 'checkboxgroup') return CheckboxGroup
    if(type === 'colorfield') return ColorField
    if(type === 'criteriafield') return CriteriaField
    if(type === 'datefield') return DateField
    if(type === 'dropdown') return Dropdown
    if(type === 'emailfield') return EmailField
    if(type === 'filefield') return FileField
    if(type === 'fontfamilyfield') return FontFamilyField
    if(type === 'fontsizefield') return FontSizeField
    if(type === 'hidden') return Hidden
    if(type === 'htmlfield') return HtmlField
    if(type === 'linkfield') return LinkField
    if(type === 'lookup') return Lookup
    if(type === 'lookup2') return Lookup2
    if(type === 'moneyfield') return MoneyField
    if(type === 'numberfield') return NumberField
    if(type === 'password') return Password
    if(type === 'phonefield') return PhoneField
    if(type === 'phonenumberfield') return PhoneNumberField
    if(type === 'profilefield') return ProfileField
    if(type === 'range') return Range
    if(type === 'radiogroup') return RadioGroup
    if(type === 'rating') return Rating
    if(type === 'submit') return Submit
    if(type === 'tablefield') return TableField
    if(type === 'text') return Text
    if(type === 'textarea') return TextArea
    if(type === 'textfield') return TextField
    if(type === 'timefield') return TimeField
    if(type === 'togglelist') return ToggleList
    if(type === 'videofield') return VideoField
  }

  _getProps() {
    const { field, defaultValue, onBusy, onChange, onSubmit, onValid } = this.props
    return {
      ...field,
      defaultValue,
      onBusy,
      onChange,
      onReady: this._handleReady,
      onSubmit,
      onValid
    }
  }

  _handleReady(onValidate) {
    const { onReady } = this.props
    this.onValidate = onValidate || this._handleValidate
    onReady()
  }

  _handleValidate() {
    const { field, defaultValue, onValid } = this.props
    const { name, required } = field
    const rules = field.rules || []
    if(required) rules.unshift('required')
    const results = Checkit({
      [name]: rules
    }).validateSync({
      [name]: defaultValue
    })
    const errors = results[0] ? results[0].toJSON()[name] : null
    onValid(defaultValue, errors)
  }

}

export default Control
