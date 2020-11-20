import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class MoneyField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    htmlFor: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    reference: PropTypes.func,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    max: 100000000,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    focused: false,
    value: null
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.throttle(this._handleChange.bind(this), 250, { trailing:  true })
  _handleReset = this._handleReset.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className={ this._getClass() }>
        <div className="maha-input-field">
          <input { ...this._getInput() } />
        </div>
        { value > 0 &&
          <div className="maha-input-clear" onClick={ this._handleReset }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, reference } = this.props
    this.setState({
      value: !_.isNil(defaultValue) ? parseInt(defaultValue) * 100 : 0
    })
    if(reference) reference(this.input)
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    const { focused, value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(focused !== prevState.focused) {
      if(focused) return this.props.onFocus()
      return this.props.onBlur()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getClass() {
    const { focused } = this.state
    const { disabled } = this.props
    const classes = ['maha-input','maha-moneyfield']
    if(disabled) classes.push('disabled')
    if(focused) classes.push('focused')
    return classes.join(' ')
  }

  _getFormatted() {
    const { value } = this.state
    return numeral(value ? value / 100 : 0).format('$0,0.00')
  }

  _getInput() {
    const { htmlFor, tabIndex } = this.props
    return {
      ref: node => this.input = node,
      id: htmlFor,
      type: 'tel',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: 'off',
      maxLength: 12,
      tabIndex,
      value: this._getFormatted(),
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus
    }
  }

  _getValue() {
    const { value } = this.state
    return value > 0 ? value / 100 : 0
  }

  _handleBlur(e) {
    this.setState({
      focused: false
    })
  }

  _handleChange() {
    const value = this._getValue()
    this.props.onChange(value > 0 ? value : 0)
  }

  _handleFocus(e) {
    this.setState({
      focused: true
    })
  }

  _handleReset() {
    this.setState({
      value: 0
    })
    this.input.focus()
  }

  _handleUpdate(e) {
    const { max } = this.props
    const value = parseInt(e.target.value.replace(/[$,.]/g,''))
    this.setState({
      value: value > max ? this.state.value : value
    })
  }

  _handleValidate() {
    const { min, onValidate } = this.props
    const value = this._getValue()
    if(min !== undefined && Number(value) < min) return onValidate(value, [`This field must be greater than or equal to  ${min}`])
    onValidate(value)
  }

}

export default MoneyField
