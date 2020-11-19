import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class MoneyField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    min: PropTypes.number,
    max: PropTypes.number,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    max: 100000000,
    tabIndex: 0,
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    focused: false,
    value: null
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.throttle(this._handleChange.bind(this), 250, { trailing:  true })
  _handleFocus = this._handleFocus.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    if(value === null) return null
    return (
      <div className="maha-moneyfield">
        <div className="maha-input">
          <div className="maha-input-field">
            <input { ...this._getInput() } />
          </div>
          { value > 0 &&
            <div className="maha-input-clear" onClick={ this._handleReset }>
              <i className="fa fa-times" />
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.setState({
      value: !_.isNil(defaultValue) ? defaultValue * 100 : 0
    })
    this.props.onReady(this._handleValidate)
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

  _getFormatted() {
    const { value } = this.state
    return numeral(value / 100).format('$0,0.00')
  }

  _getInput() {
    const { tabIndex } = this.props
    return {
      ref: node => this.input = node,
      className: 'ui input',
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

  _handleBlur() {
    const { value } = this.state
    this.setState({
      focused: false,
      value: value.length > 0 ? numeral(value).format('0.00') : value
    })
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange(value > 0 ? value / 100 : 0)
  }

  _handleFocus() {
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
    const { min } = this.props
    const { value } = this.state
    if(min !== undefined && Number(value) < min) {
      this.props.onValid(value, `This field must be greater than or equal to  ${min}`)
    } else {
      this.props.onValid(value)
    }
  }

}

export default MoneyField
