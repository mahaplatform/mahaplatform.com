import DateRange from './daterange'
import PropTypes from 'prop-types'
import Activity from './activity'
import Checkbox from './checkbox'
import Boolean from './boolean'
import Select from './select'
import React from 'react'
import Text from './text'
import Date from './date'
import Time from './time'
import _ from 'lodash'

class Field extends React.PureComponent {

  static contextTypes = {
    filter: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    field: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    code: null
  }

  render() {
    const { field } = this.props
    const Component = this._getComponent(field.type)
    return <Component { ...this._getProps() } />
  }

  componentDidMount() {
    this.setState({
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    })
  }

  _getComponent(type) {
    if(!_.isString(type)) return type
    if(type === 'activity') return Activity
    if(type === 'boolean') return Boolean
    if(type === 'checkbox') return Checkbox
    if(type === 'daterange') return DateRange
    if(type === 'select') return Select
    if(type === 'date') return Date
    if(type === 'time') return Time
    return Text
  }

  _getProps() {
    const { defaultValue, field, onCancel, onChange, onDone } = this.props
    const { code } = this.state
    return {
      ...field,
      code,
      defaultValue,
      onCancel,
      onChange,
      onDone
    }
  }

}

export default Field
