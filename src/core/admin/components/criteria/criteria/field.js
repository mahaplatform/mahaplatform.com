import DateRange from './daterange'
import PropTypes from 'prop-types'
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
    parent: PropTypes.string,
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
    if(type === 'daterange') return DateRange
    if(type === 'select') return Select
    if(type === 'text') return Text
  }

  _getProps() {
    const { defaultValue, field, parent, onCancel, onChange, onDone } = this.props
    const { code } = this.state
    return {
      code,
      defaultValue,
      field,
      parent,
      onCancel,
      onChange,
      onDone
    }
  }

}

export default Field
