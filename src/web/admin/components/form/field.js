import React from 'react'
import PropTypes from 'prop-types'
import Control from './control'
import Fields from './fields'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    field: PropTypes.object,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  _handleBusy = this._handleBusy.bind(this)
  _handleReady = this._handleReady.bind(this)
  _handleUpdateData = this._handleUpdateData.bind(this)

  render() {
    const { field } = this.props
    const { include, instructions, label, show, type } = field
    const error = this._getError()
    if(include === false || show === false) return null
    return (
      <div className={ this._getClass() }>
        { label &&
          <div className="maha-form-field-label">
            { label }
          </div>
        }
        <div className="maha-form-field-control">
          { instructions &&
            <div className="maha-form-field-instructions">
              { instructions }
            </div>
          }
          { type === 'fields' ?
            <Fields { ...this._getFields() } /> :
            <Control { ...this._getControl() } />
          }
          { error &&
            <div className="error-message">
              { error }
            </div>
          }
        </div>
      </div>
    )
  }

  _getClass() {
    const { field } = this.props
    const { required } = field
    const error = this._getError()
    const classes = ['maha-form-field field']
    if(required) classes.push('required')
    if(error) classes.push('error')
    return classes.join(' ')
  }

  _getError() {
    const { errors, field } = this.props
    const { name } = field
    return (errors && errors[name]) ? errors[name][0] : null
  }

  _getFields() {
    const { data, errors, field, tabIndex, onBusy, onReady, onSubmit, onUpdateData } = this.props
    return {
      data,
      errors,
      fields: field.fields,
      tabIndex,
      onBusy,
      onReady,
      onSubmit,
      onUpdateData
    }
  }

  _getControl() {
    const { data, field, onSubmit } = this.props
    const { name } = field
    return {
      field,
      defaultValue: _.get(data, name),
      onBusy: this._handleBusy.bind(this, name),
      onChange: this._handleUpdateData.bind(this, name),
      onReady: this._handleReady.bind(this, name),
      onSubmit
    }
  }

  _handleBusy(name, value) {
    this.props.onBusy(name, value)
  }

  _handleReady(name) {
    this.props.onReady(name)
  }

  _handleUpdateData(name, value) {
    this.props.onUpdateData(name, value)
  }

}

export default Field
