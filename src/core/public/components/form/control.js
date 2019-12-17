import PropTypes from 'prop-types'
import Fields from './fields'
import Field from './field'
import React from 'react'
import _ from 'lodash'

class Control extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    field: PropTypes.object,
    status: PropTypes.string,
    onUpdate: PropTypes.func,
    onSetBusy: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetValid: PropTypes.func
  }

  render() {
    const { field } = this.props
    if(field.type === 'fields') return <Fields { ...this._getFields() } />
    return <Field { ...this._getField() } />
  }

  _getField() {
    const { data, errors, field, status } = this.props
    const { name } = field
    return {
      defaultValue: _.get(data, name),
      error: errors[name],
      field,
      status,
      onBusy: this._handleSetBusy.bind(this, name),
      onChange: this._handleChange.bind(this, name),
      onReady: this._handleSetReady.bind(this, name),
      onValid: this._handleSetValid.bind(this, name)
    }
  }

  _getFields() {
    const { data, errors, field, status, onSetBusy, onSetReady, onSetValid, onUpdate } = this.props
    return {
      data,
      errors,
      fields: field.fields,
      status,
      onSetBusy,
      onSetReady,
      onSetValid,
      onUpdate
    }
  }

  _handleChange(name, value) {
    this.props.onUpdate(name, value)
  }

  _handleSetBusy(name) {
    this.props.onSetBusy(name)
  }

  _handleSetReady(name) {
    this.props.onSetReady(name)
  }

  _handleSetValid(name, value, errors) {
    this.props.onSetValid(name, value, errors)
  }


}

export default Control
