import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'

class Fields extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    config: PropTypes.object,
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    human: PropTypes.bool,
    isOpen: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    ready: PropTypes.array,
    requiresPayment: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
    validated: PropTypes.array,
    onChange: PropTypes.func,
    onPay: PropTypes.func,
    onSave: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValid: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { fields } = this.props
    return (
      <div className="maha-form-fields">
        { fields.map((field, index) => (
          <Field key={`field_${index}`} { ...this._getField(field, index) } />
        )) }
      </div>
    )
  }

  _getField(field,index) {
    const { code, errors, status, token } = this.props
    return {
      code,
      field,
      index,
      error: errors[field.name],
      status,
      token,
      onChange: this._handleChange.bind(this, field.name),
      onReady: this._handleSetReady.bind(this, field.name),
      onValidate: this._handleSetValid.bind(this, field.name)
    }
  }
  _handleChange(name, value) {
    this.props.onChange(name, value)
  }

  _handleSetReady(name) {
    this.props.onSetReady(name)
  }

  _handleSetValid(name, value, error) {
    this.props.onSetValid(name, value, error)
  }

  _handleValidate() {
    this.props.onValidate()
  }

}

export default Fields
