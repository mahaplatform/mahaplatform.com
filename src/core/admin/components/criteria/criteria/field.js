import DateRange from './daterange'
import PropTypes from 'prop-types'
import Checkbox from './checkbox'
import Select from './select'
import React from 'react'
import Text from './text'
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
      code: _.random(100000, 999999).toString(36)
    })
  }

  _getComponent(type) {
    if(!_.isString(type)) return type
    if(type === 'checkbox') return Checkbox
    if(type === 'daterange') return DateRange
    if(type === 'select') return Select
    return Text
  }

  _getProps() {
    const { defaultValue, field, onCancel, onChange, onDone } = this.props
    const { code } = this.state
    return {
      code,
      defaultValue,
      field,
      onCancel,
      onChange,
      onDone
    }
  }

}

export default Field
