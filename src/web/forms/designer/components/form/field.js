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
    errors: PropTypes.array,
    field: PropTypes.object,
    onChange: PropTypes.func
  }

  state = {
    code: null
  }

  render() {
    const { errors, field } = this.props
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
        { errors &&
          <div className="field-error">
            { errors[0] }
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
    const { errors, field } = this.props
    const classes = ['field']
    if(field.required) classes.push('required')
    if(errors) classes.push('error')
    return classes.join(' ')
  }

  _getField() {
    const { field, onChange } = this.props
    const { code } = this.state
    return {
      code,
      ...field,
      onChange
    }
  }

}

export default Field
