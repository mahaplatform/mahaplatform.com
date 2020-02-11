import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    format: PropTypes.object,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    focused: false,
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.debounce(this._handleChange.bind(this), 250, { leading: true })
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { disabled } = this.props
    const { value } = this.state
    return (
      <div className={ this._getClass() }>
        <div className="maha-input-field">
          <input { ...this._getInput() } />
        </div>
        { !disabled && value && value.length > 0 &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: defaultValue
    })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getClass() {
    const { disabled } = this.props
    const classes = ['maha-input','maha-textfield']
    if(disabled) classes.push('disabled')
    return classes.join(' ')
  }

  _getInput() {
    const { disabled, htmlFor, name, placeholder, tabIndex } = this.props
    const { focused, value } = this.state
    return {
      id: htmlFor,
      disabled: disabled === true,
      name,
      placeholder: !focused ? placeholder : null,
      ref: node => this.input = node,
      tabIndex,
      type: 'text',
      value,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus
    }
  }

  _handleBlur() {
    this.setState({
      value: this.input.value.trim(),
      focused: false
    })
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleFocus() {
    this.setState({
      focused: true
    })
  }

  _handleUpdate(e) {
    if(e.which == 13) return
    this.setState({
      value: e.target.value
    })
  }

  _handleValidate() {
    const { format, required } = this.props
    const { value } = this.state
    if(required && value.length === 0) {
      this.props.onValidate(value, 'You must enter a value')
    } else if(format && !format.regex.test(value)) {
      this.props.onValidate(value, format.message)
    } else {
      this.props.onValidate(value)
    }
  }

}

export default TextField
