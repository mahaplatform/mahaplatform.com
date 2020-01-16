import React from 'react'
import PropTypes from 'prop-types'
import Control from './control'
import Segment from './segment'
import Fields from './fields'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    field: PropTypes.object,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdateData: PropTypes.func,
    onValid: PropTypes.func
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
          { type === 'fields' && <Fields { ...this._getFields() } /> }
          { type === 'segment' && <Segment { ...this._getFields() } /> }
          { !_.includes(['fields','segment'], type) && <Control { ...this._getControl() } /> }
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
    const { type, required } = field
    const error = this._getError()
    const classes = ['maha-form-field field']
    if(_.includes(['hidden'], type)) classes.push('hidden')
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
    const { data, errors, field, status, tabIndex, onBusy, onReady, onSubmit, onUpdateData, onValid } = this.props
    return {
      data,
      errors,
      fields: field.fields,
      status,
      tabIndex,
      onBusy,
      onReady,
      onSubmit,
      onUpdateData,
      onValid
    }
  }

  _getControl() {
    const { data, field, status, onSubmit } = this.props
    const { name } = field
    return {
      defaultValue: _.get(data, name),
      field,
      status,
      onBusy: this._handleBusy.bind(this, name),
      onChange: this._handleUpdateData.bind(this, name),
      onReady: this._handleReady.bind(this, name),
      onSubmit,
      onValid: this._handleValid.bind(this, name)
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

  _handleValid(name, value, errors) {
    this.props.onValid(name, value, errors)
  }

}

export default Field
