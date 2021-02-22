import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

class TimeField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter a time',
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    focused: false,
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleUpdate =this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className={ this._getClass() }>
        <div className="maha-input-field">
          <input { ...this._getInput() } />
        </div>
        { value && value.length > 0 &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        value: this._getParsed(defaultValue)
      })
    }
    this.props.onReady()
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
    const { focused } = this.state
    const { disabled } = this.props
    const classes = ['maha-timefield','maha-input']
    if(disabled) classes.push('disabled')
    if(focused) classes.push('focused')
    return classes.join(' ')
  }

  _getFormatted() {
    const value = this.state.value.trim()
    const parsed = moment(value, ['HH:mm','H:mm','h:mmA','h:mm A','h:m'])
    if(!parsed.isValid()) return value
    return parsed.format('h:mm A')
  }

  _getInput() {
    const { placeholder, tabIndex } = this.props
    const { value } = this.state
    return {
      ref: node => this.input = node,
      placeholder,
      tabIndex,
      value,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onKeyDown: this._handleKeyDown,
      onChange: this._handleUpdate
    }
  }

  _getParsed(value) {
    return moment(`2020-01-01 ${value}`).format('h:mm A')
  }

  _getRaw() {
    const { value } = this.state
    return moment(`2020-01-01 ${value}`, 'YYYY-MM-DD h:mm A').format('HH:mm')
  }

  _handleBlur(e) {
    this.setState({
      focused: false,
      value: this._getFormatted()
    })
  }

  _handleChange() {
    const raw = this._getRaw()
    this.props.onChange(raw)
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

  _handleKeyDown(e) {
    if(e.which === 13) this.input.blur()
  }

  _handleUpdate(e) {
    const value = e.target.value
    this.setState({ value })
  }

  _handleValidate() {
    const { value } = this.state
    const { required } = this.props
    if(required && (!value || value.length === 0)) {
      return this.props.onValidate(null, ['You must enter a value'])
    }
    const parsed = moment(value, ['HH:MM','H:MM','h:mmA','h:mm A','h:m'])
    if(!parsed.isValid()) {
      return this.props.onValidate(null, ['You must enter a valid time format'])
    }
    const raw = this._getRaw()
    this.props.onValidate(raw)
  }

}

export default TimeField
