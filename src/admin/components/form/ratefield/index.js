import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class RateField extends React.Component {

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
    onValidate: PropTypes.func
  }

  static defaultProps = {
    max: 99.999,
    tabIndex: 0,
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    focused: false,
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.throttle(this._handleChange.bind(this), 250, { trailing:  true })
  _handleFocus = this._handleFocus.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-ratefield">
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
    if(!_.isNil(defaultValue)) this.setState({
      value: defaultValue * 100000
    })
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

  _getFormatted() {
    const { value } = this.state
    return numeral(value / 1000).format('0.000')
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
      maxLength: 8,
      tabIndex,
      value: this._getFormatted(),
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus
    }
  }

  _handleBlur() {
    this.setState({
      focused: false
    })
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange(value > 0 ? value / 100000 : 0)
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
    const value = parseInt(e.target.value.replace(/[%,.]/g,''))
    this.setState({
      value: value > max * 1000 ? this.state.value : value
    })
  }

  _handleValidate() {
    const { min, required } = this.props
    const { value } = this.state
    if(required === true && value === '') {
      this.props.onValidate(value, 'This field is required')
    } else if(min !== undefined && Number(value) < min) {
      this.props.onValidate(value, `This field must be greater than or equal to  ${min}`)
    } else {
      this.props.onValidate(value)
    }
  }

}

export default RateField
