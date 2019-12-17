import PhoneField from './phonefield'
import RadioGroup from './radiogroup'
import Checkboxes from './checkboxes'
import DateField from './datefield'
import TimeField from './timefield'
import TextField from './textfield'
import FileField from './filefield'
import Recaptcha from './recaptcha'
import PropTypes from 'prop-types'
import TextArea from './textarea'
import DropDown from './dropdown'
import Fields from './fields'
import Checkit from 'checkit'
import React from 'react'
import Text from './text'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    code: PropTypes.string,
    error: PropTypes.array,
    field: PropTypes.object,
    status: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  onValidate = null

  state = {
    code: null
  }

  _handleReady = this._handleReady.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { error, field } = this.props
    const { label, type } = field
    const { code } = this.state
    if(type === 'fields') return <Fields { ...this._getFields() } />
    const Component = this._getControl()
    return (
      <div className={ this._getClass() }>
        { label && <label htmlFor={ code }>{ label }</label> }
        <Component { ...this._getField() } />
        { error &&
          <div className="field-error">
            { error }
          </div>
        }
      </div>
    )
  }

  _getControl() {
    const { field } = this.props
    const type = field.type || 'textfield'
    if(!_.isString(type)) return type
    if(type === 'radiogroup') return RadioGroup
    if(type === 'checkboxes') return Checkboxes
    if(type === 'dropdown') return DropDown
    if(type === 'textfield') return TextField
    if(type === 'textarea') return TextArea
    if(type === 'datefield') return DateField
    if(type === 'textfield') return TextField
    if(type === 'timefield') return TimeField
    if(type === 'filefield') return FileField
    if(type === 'phonefield') return PhoneField
    if(type === 'captcha') return Recaptcha
    if(type === 'text') return Text
    return TextField
  }

  componentDidMount() {
    this.setState({
      code: _.random(100000000, 999999999).toString(36)
    })
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'validating') this.onValidate()
    }
  }

  _getClass() {
    const { error, field } = this.props
    const classes = ['field']
    if(field.required) classes.push('required')
    if(error) classes.push('error')
    return classes.join(' ')
  }

  _getField() {
    const { field, status, onBusy, onChange, onValid } = this.props
    const { code } = this.state
    return {
      code,
      ...field,
      status,
      onBusy,
      onChange,
      onReady: this._handleReady,
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

export default Field
