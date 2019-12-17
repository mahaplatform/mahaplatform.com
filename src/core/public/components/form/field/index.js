import TextField from './textfield'
import PropTypes from 'prop-types'
import DropDown from './dropdown'
import Checkit from 'checkit'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    code: PropTypes.string,
    error: PropTypes.array,
    field: PropTypes.object,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  onValidate = null

  state = {
    code: null
  }

  _handleReady = this._handleReady.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { error, field } = this.props
    const { label } = field
    const { code } = this.state
    const Component = this._getControl()
    return (
      <div className={ this._getClass() }>
        { label && <label htmlFor={ code }>{ label }</label> }
        <Component { ...this._getField() } />
        { error &&
          <div className="field-error">
            { error }
          </div>
        }
      </div>
    )
  }

  _getControl() {
    const { field } = this.props
    if(field.type === 'dropdown') return DropDown
    if(field.type === 'textfield') return TextField
    const type = field.type || 'textfield'
    if(!_.isString(type)) return type
    if(type === 'dropdown') return DropDown
    if(type === 'textfield') return TextField
  }

  componentDidMount() {
    this.setState({
      code: _.random(100000000, 999999999).toString(36)
    })
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'validating') this.onValidate()
    }
  }

  _getClass() {
    const { error, field } = this.props
    const classes = ['field']
    if(field.required) classes.push('required')
    if(error) classes.push('error')
    return classes.join(' ')
  }

  _getField() {
    const { field, status, onChange, onValid } = this.props
    const { code } = this.state
    return {
      code,
      ...field,
      status,
      onChange,
      onReady: this._handleReady,
      onValid
    }
  }

  _handleReady(onValidate) {
    const { onReady } = this.props
    this.onValidate = onValidate || this._handleValidate
    onReady()
  }

  _handleValidate() {
    const { field, defaultValue, onValid } = this.props
    const { name, required } = field
    const rules = field.rules || []
    if(required) rules.unshift('required')
    const results = Checkit({
      [name]: rules
    }).validateSync({
      [name]: defaultValue
    })
    const errors = results[0] ? results[0].toJSON()[name] : null
    onValid(defaultValue, errors)
  }

}

export default Field
