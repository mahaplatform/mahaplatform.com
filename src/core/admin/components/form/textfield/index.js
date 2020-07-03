import PropTypes from 'prop-types'
import Emojis from '../../emojis'
import React from 'react'
import _ from 'lodash'

class TextField extends React.Component {

  static propTypes = {
    autoComplete: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    emojis: PropTypes.bool,
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
    onReady: PropTypes.func
  }

  static defaultProps = {
    autoComplete: 'off',
    defaultValue: '',
    disabled: false,
    emojis: false,
    maxLength: null,
    placeholder: '',
    prefix: null,
    sanitize: (value) => value,
    suffix: null,
    tabIndex: 0,
    trim: true,
    validate: (value) => true,
    onBusy: () => {},
    onChange: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {},
    onKeyDown: () => {},
    onReady: () => {}
  }

  code = _.random(100000000, 999999999).toString(36)
  input = null

  state = {
    focused: false,
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleInsertEmoji = this._handleInsertEmoji.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleSet = this._handleSet.bind(this)

  render() {
    const { disabled, emojis } = this.props
    const { value } = this.state
    return (
      <div className={ this._getClass() }>
        <div className="maha-input-field">
          { this.props.prefix && <div className="ui label">{this.props.prefix}</div> }
          <input { ...this._getControl() } />
          { this.props.suffix && <div className="ui label">{this.props.suffix}</div> }
        </div>
        { emojis &&
          <div className="maha-input-emojis">
            <Emojis { ...this._getEmojis() } />
          </div>
        }
        { value && value.length > 0 && !disabled &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this._handleSet(_.toString(defaultValue))
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { defaultValue } = this.props
    const { value } = this.state
    if(defaultValue !== prevProps.defaultValue) {
      this._handleSet(defaultValue)
    }
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getClass() {
    const { disabled, prefix, suffix } = this.props
    const classes = ['maha-input','maha-textfield']
    if(prefix) classes.push('left labeled')
    if(suffix) classes.push('right labeled')
    if(disabled) classes.push('disabled')
    return classes.join(' ')
  }

  _getControl() {
    const { autoComplete, disabled, placeholder, tabIndex, onKeyPress, onKeyDown } = this.props
    const { focused, value } = this.state
    return {
      ref: node => this.input = node,
      type: 'text',
      disabled,
      value,
      tabIndex,
      autoComplete,
      placeholder: !focused ? placeholder : null,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus,
      onKeyPress,
      onKeyUp: this._handleKeyUp,
      onKeyDown
    }
  }

  _getEmojis() {
    return {
      onChoose: this._handleInsertEmoji
    }
  }

  _handleBlur() {
    this.setState({
      focused: false
    })
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleClear() {
    this._handleSet('')
  }

  _handleFocus() {
    this.setState({
      focused: true
    })
  }

  _handleInsertEmoji(emoji) {
    const { value } = this.input
    if(document.selection) {
      this.input.focus()
      const selection = document.selection.createRange()
      selection.text = emoji
    } else if (this.input.selectionStart || this.input.selectionStart === '0') {
      const beginning = value.substring(0, this.input.selectionStart)
      const ending = value.substring(this.input.selectionEnd, value.length)
      this._handleSet(beginning + emoji + ending)
    } else {
      this._handleSet(value + emoji)
    }
  }

  _handleKeyUp(e) {
    this.props.onKeyUp(this.state.value)
    if(e.which == 13) e.preventDefault()
  }

  _handleSet(value) {
    if(this.props.maxLength && value.length > this.props.maxLength) return
    this.setState({ value })
  }

  _handleUpdate(e) {
    const sanitized = this.props.sanitize(e.target.value)
    if(!this.props.validate(sanitized)) return e.preventDefault()
    this._handleSet(sanitized)
  }

}

export default TextField
