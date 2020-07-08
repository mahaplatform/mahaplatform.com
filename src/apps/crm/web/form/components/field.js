import {
  AddressField,
  Checkboxes,
  RadioGroup,
  PhoneField,
  FileField,
  TextField,
  DateField,
  TimeField,
  TextArea,
  DropDown,
  Checkbox,
  Text
} from 'maha-client'
import ProductField from '../../embedded/components/form/fields/productfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    config: PropTypes.object,
    field: PropTypes.object,
    index: PropTypes.number,
    onAction: PropTypes.func
  }

  render() {
    const { field } = this.props
    const { label, instructions } = field
    if(Object.keys(field).length === 1) return null
    const Component  = this._getComponent(field)
    return (
      <div className={ this._getClass() }>
        <div className={ this._getFieldClass() }>
          { label && <label>{ label }</label> }
          { instructions &&
            <div className="field-instructions" dangerouslySetInnerHTML={{ __html: instructions }} />
          }
          <Component { ...this._getField() } />
        </div>
        <div className="block-highlight" />
        <div className="block-actions">
          <div className="block-spacer"></div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'edit') }>
            <i className="fa fa-pencil"></i>
          </div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'clone') }>
            <i className="fa fa-copy"></i>
          </div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'remove') }>
            <i className="fa fa-trash"></i>
          </div>
        </div>
      </div>
    )
  }

  _getClass() {
    const { active, index } = this.props
    const is_active = active !== null && active === index
    const classes = ['block']
    if(is_active) classes.push('active')
    return classes.join(' ')
  }

  _getComponent(field) {
    if(field.type === 'contactfield' && field.contactfield) return this._getComponent(field.contactfield)
    if(field.type === 'addressfield') return AddressField
    if(field.type === 'checkboxes') return Checkboxes
    if(field.type === 'checkbox') return Checkbox
    if(field.type === 'datefield') return DateField
    if(field.type === 'dropdown') return DropDown
    if(field.type === 'filefield') return FileField
    if(field.type === 'phonefield') return PhoneField
    if(field.type === 'productfield') return ProductField
    if(field.type === 'radiogroup') return RadioGroup
    if(field.type === 'text') return Text
    if(field.type === 'textarea') return TextArea
    if(field.type === 'timefield') return TimeField
    return TextField
  }

  _getField() {
    const field = {
      ...this.props.field.contactfield || {},
      ...this.props.field
    }

    return {
      ...field,
      name: _.get(field, 'name.value')
    }
  }

  _getFieldClass() {
    const { field, index } = this.props
    const classes = ['field',`field-${index}`]
    if(field.required) classes.push('required')
    return classes.join(' ')
  }

  _handleAction(action) {
    const { index, onAction } = this.props
    onAction(action, { index })
  }

}

export default Field
