import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

class TimeField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    format: PropTypes.string,
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
    format: 'h:mm A',
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
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
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

  _handleBlur() {
    const { format } = this.props
    this.setState({ focused: false })
    if(this.state.value.length === 0) return
    const raw = moment(`010120 ${this.state.value}`, ['H:mm','h:mma','h:mmA','h:mm a','h:mm A'].map(time => {
      return `MMDDYY ${time}`
    }), true)
    if(!raw.isValid()) return this.setState({ value: '' })
    const value = raw.format(format)
    this.setState({ value })
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
    if(!value.match(/^[\d\s:APM]*$/)) return
    this.setState({ value })
  }

  _handleValidate() {
    const { required } = this.props
    const { value } = this.state
    if(required && value === null) {
      this.props.onValidate(value, 'You must choose a date')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default TimeField
