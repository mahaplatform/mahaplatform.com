import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextField extends React.Component {

  static propTypes = {
    autoComplete: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    sanitize: PropTypes.func,
    suffix: PropTypes.string,
    tabIndex: PropTypes.number,
    trim: PropTypes.bool,
    validate: PropTypes.func,
    onBlur: PropTypes.func,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    autoComplete: 'off',
    defaultValue: '',
    disabled: false,
    maxLength: null,
    placeholder: '',
    prefix: null,
    sanitize: (value) => value,
    suffix: null,
    tabIndex: 0,
    trim: true,
    validate: (value) => true,
    onBlur: () => {},
    onBusy: () => {},
    onChange: () => {},
    onFocus: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {},
    onKeyDown: () => {},
    onReady: () => {},
    onSubmit: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = _.debounce(this._handleChange.bind(this), 250, { trailing:  true })
  _handleClear = this._handleClear.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className={ this._getClass() }>
        <div className="maha-input-field">
          { this.props.prefix && <div className="ui label">{this.props.prefix}</div> }
          <input { ...this._getControl() } />
          { this.props.suffix && <div className="ui label">{this.props.suffix}</div> }
        </div>
        { value.length > 0 &&
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
      value: _.toString(defaultValue)
    })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.defaultValue !== prevProps.defaultValue) {
      this.setValue(this.props.defaultValue)
    }
    if(this.state.value !== prevState.value) {
      this._handleChange()
    }
  }


  _getClass() {
    const { prefix, suffix } = this.props
    const classes = ['maha-input','maha-textfield']
    if(prefix) classes.push('left labeled')
    if(suffix) classes.push('right labeled')
    return classes.join(' ')
  }

  _getControl() {
    const { autoComplete, disabled, placeholder, tabIndex, onBlur, onFocus, onKeyPress, onKeyDown } = this.props
    const { value } = this.state
    return {
      tabIndex,
      type: 'text',
      disabled,
      value,
      autoComplete,
      placeholder,
      onChange: this._handleUpdate,
      onBlur,
      onFocus,
      onKeyPress,
      onKeyUp: this._handleKeyUp,
      onKeyDown
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value )
  }

  _handleClear() {
    this.setValue('')
  }

  _handleKeyUp(event) {
    this.props.onKeyUp(this.state.value)
    if(event.which == 13) {
      event.preventDefault()
      this.props.onSubmit()
    }
  }
  
  _handleUpdate(event) {
    const sanitized = this.props.sanitize(event.target.value)
    if(!this.props.validate(sanitized)) return event.preventDefault()
    this.setValue(sanitized)
  }

  setValue(value) {
    if(this.props.maxLength && value.length > this.props.maxLength) return
    this.setState({ value })
  }

}

export default TextField
