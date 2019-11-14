import ProductField from './productfield'
import PaymentField from './paymentfield'
import Checkboxes from './checkboxes'
import RadioGroup from './radiogroup'
import FileField from './filefield'
import TextField from './textfield'
import DateField from './datefield'
import TimeField from './timefield'
import PropTypes from 'prop-types'
import TextArea from './textarea'
import Dropdown from './dropdown'
import Text from './text'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    error: PropTypes.string,
    field: PropTypes.object,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onFinalize: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    code: null
  }

  render() {
    const { error, field } = this.props
    const { label, type } = field
    const { code } = this.state
    return (
      <div className={ this._getClass() }>
        { label && <label htmlFor={ code }>{ label }</label> }
        { type === 'datefield' && <DateField { ...this._getField() } /> }
        { type === 'timefield' && <TimeField { ...this._getField() } /> }
        { type === 'text' && <Text { ...this._getField() } /> }
        { type === 'textfield' && <TextField { ...this._getField() } /> }
        { type === 'textarea' && <TextArea{ ...this._getField() } /> }
        { type === 'radiogroup' && <RadioGroup { ...this._getField() } /> }
        { type === 'checkboxes' && <Checkboxes { ...this._getField() } /> }
        { type === 'dropdown' && <Dropdown { ...this._getField() } /> }
        { type === 'filefield' && <FileField { ...this._getField() } /> }
        { type === 'productfield' && <ProductField { ...this._getField() } /> }
        { type === 'paymentfield' && <PaymentField { ...this._getField() } /> }
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
      code: _.random(100000000, 999999999).toString(36)
    })
  }

  _getClass() {
    const { error, field } = this.props
    const classes = ['field']
    if(field.required) classes.push('required')
    if(error) classes.push('error')
    return classes.join(' ')
  }

  _getField() {
    const { field, status, onChange, onReady, onFinalize, onValidate } = this.props
    const { code } = this.state
    return {
      code,
      ...field,
      status,
      onChange,
      onReady,
      onFinalize,
      onValidate
    }
  }

}

export default Field
