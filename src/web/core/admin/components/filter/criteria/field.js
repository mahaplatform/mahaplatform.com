import DateRange from './daterange'
import PropTypes from 'prop-types'
import Select from './select'
import React from 'react'
import Text from './text'

class Field extends React.PureComponent {

  static contextTypes = {
    filter: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    field: PropTypes.object,
    mode: PropTypes.string,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { field } = this.props
    const Component = this._getComponent(field.type)
    return <Component { ...this._getProps() } />
  }

  _getComponent(type) {
    if(type === 'daterange') return DateRange
    if(type === 'select') return Select
    if(type === 'text') return Text
  }

  _getProps() {
    const { defaultValue, field, mode } = this.props
    return {
      defaultValue,
      field,
      mode,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    const { mode } = this.props
    this.context.filter.pop(mode == 'edit' ? -1 : -2)
  }

  _handleChange(value) {
    const { field } = this.props
    console.log('changed', field.key, value)
  }

  _handleDone(value) {
    const { mode, field } = this.props
    this.props.onDone({ [field.key]: value })
    this.context.filter.pop(mode === 'edit' ? -1 : -2)
  }

}

export default Field
