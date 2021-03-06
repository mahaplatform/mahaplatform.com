import AlignmentField from './alignmentfield'
import AssignmentField from './assignmentfield'
import AttachmentField from './attachmentfield'
import AddressField from './addressfield'
import Checkbox from './checkbox'
import Checkboxes from './select/checkboxes'
import CodeField from './codefield'
import ColorField from './colorfield'
import CriteriaField from './criteriafield'
import DateField from './datefield'
import DateTimeField from './datetimefield'
import Dropdown from './dropdown'
import EmailField from './emailfield'
import FileField from './filefield'
import FormatField from './formatfield'
import Hidden from './hidden'
import HtmlField from './htmlfield'
import LinkField from './linkfield'
import Lookup from './lookup'
import Lookup2 from './lookup2'
import MoneyField from './moneyfield'
import NumberField from './numberfield'
import Password from './password'
import PermalinkField from './permalinkfield'
import ProfileField from './profilefield'
import PhoneField from './phonefield'
import PhoneNumberField from './phonenumberfield'
import RadioGroup from './select/radio_group'
import Range from './range'
import Rating from './rating'
import RateField from './ratefield'
import SMSField from './smsfield'
import Submit from './submit'
import TableField from './tablefield'
import TagField from './tagfield'
import Text from './text'
import TextArea from './textarea'
import TextField from './textfield'
import TimeField from './timefield'
import ToggleList from './toggle_list'
import TokenField from './tokenfield'
import VideoField from './videofield'
import URLField from './urlfield'
import PropTypes from 'prop-types'
import Checkit from 'checkit'
import React from 'react'
import _ from 'lodash'
import messages from './messages'

class Control extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    field: PropTypes.object,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
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
    if(type === 'alignmentfield') return AlignmentField
    if(type === 'assignmentfield') return AssignmentField
    if(type === 'attachmentfield') return AttachmentField
    if(type === 'addressfield') return AddressField
    if(type === 'checkbox') return Checkbox
    if(type === 'checkboxgroup') return Checkboxes
    if(type === 'checkboxes') return Checkboxes
    if(type === 'codefield') return CodeField
    if(type === 'colorfield') return ColorField
    if(type === 'criteriafield') return CriteriaField
    if(type === 'datefield') return DateField
    if(type === 'datetimefield') return DateTimeField
    if(type === 'dropdown') return Dropdown
    if(type === 'emailfield') return EmailField
    if(type === 'filefield') return FileField
    if(type === 'formatfield') return FormatField
    if(type === 'hidden') return Hidden
    if(type === 'htmlfield') return HtmlField
    if(type === 'linkfield') return LinkField
    if(type === 'lookup') return Lookup
    if(type === 'lookup2') return Lookup2
    if(type === 'moneyfield') return MoneyField
    if(type === 'numberfield') return NumberField
    if(type === 'password') return Password
    if(type === 'permalinkfield') return PermalinkField
    if(type === 'phonefield') return PhoneField
    if(type === 'phonenumberfield') return PhoneNumberField
    if(type === 'profilefield') return ProfileField
    if(type === 'range') return Range
    if(type === 'radiogroup') return RadioGroup
    if(type === 'rating') return Rating
    if(type === 'ratefield') return RateField
    if(type === 'smsfield') return SMSField
    if(type === 'submit') return Submit
    if(type === 'tagfield') return TagField
    if(type === 'tablefield') return TableField
    if(type === 'text') return Text
    if(type === 'textarea') return TextArea
    if(type === 'textfield') return TextField
    if(type === 'timefield') return TimeField
    if(type === 'togglelist') return ToggleList
    if(type === 'tokenfield') return TokenField
    if(type === 'videofield') return VideoField
    if(type === 'urlfield') return URLField
    return TextField
  }

  _getProps() {
    const { field, defaultValue, tabIndex, onBusy, onChange, onSubmit, onValid } = this.props
    return {
      ...field,
      originalValue: field.defaultValue,
      defaultValue,
      tabIndex,
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
    }, { messages }).validateSync({
      [name]: defaultValue
    })
    const errors = results[0] ? results[0].toJSON()[name] : null
    onValid(defaultValue, errors)
  }

}

export default Control
