import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    isReady: PropTypes.bool,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onSetErrors: PropTypes.func,
    onSetReady: PropTypes.func
  }

  _handleValidate = this._handleValidate.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { fields } = this.props
    return (
      <div className="maha-form-fields">
        <div className="ui form">
          { fields.map((field, index) => (
            <Field key={`field_${index}`} { ...this._getField(field) } />
          )) }
          <button className="ui blue fluid button" onClick={ this._handleValidate }>Submit</button>
        </div>
      </div>
    )
  }

  _getField(field) {
    const { errors } = this.props
    return {
      field,
      errors: errors[field.name],
      onChange: this._handleChange.bind(this, field.name),
      onReady: this._handleSetReady.bind(this, field.name)
    }
  }

  _getErrors(field) {
    const { data } = this.props
    const value = data[field.name]
    if(field.required && (!value || value.length === 0)) {
      return {
        [field.name]: ['This field is required']
      }
    }
    return {}
  }

  _handleChange(name, value) {
    this.props.onChange(name, value)
  }

  _handleSetReady(name) {
    this.props.onSetReady(name)
  }

  _handleValidate() {
    const { fields } = this.props
    const errors = fields.reduce((errors, field) => ({
      ...errors,
      ...this._getErrors(field)
    }), {})
    if(Object.keys(errors).length > 0) {
      return this.props.onSetErrors(errors)
    }
    this._handleSubmit()
  }

  _handleSubmit() {
    console.log('submit')
  }

}

export default Form
