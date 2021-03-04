import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Ratefield extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
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
    placeholder: '0.00',
    tabIndex: 0,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    focused: false,
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.throttle(this._handleChange.bind(this), 250, { trailing:  true })
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-moneyfield">
        <div className="maha-input">
          <div className="maha-input-field">
            <input { ...this._getInput() } />
          </div>
          { value !== null && value.length > 0 &&
            <div className="maha-input-clear" onClick={ this._handleClear }>
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
      value: numeral(defaultValue).format('0.000')
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

  _getInput() {
    const { tabIndex } = this.props
    const { focused, value } = this.state
    return {
      tabIndex,
      className: 'ui input',
      type: 'textfield',
      placeholder: !focused ? '0.000' : null,
      value,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus
    }
  }

  _handleBlur() {
    const { value } = this.state
    this.setState({
      focused: false,
      value: value.length > 0 ? numeral(value).format('0.000') : value
    })
  }

  _handleChange() {
    this.props.onChange(Number(this.state.value))
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
    const value = e.target.value
    if(!value.match(/^-?\d*\.?\d{0,2}$/)) return
    this.setState({ value })
  }

  _handleValidate() {
    const { min, max, required } = this.props
    const { value } = this.state
    console.log(value)
    if(required === true && value === '') {
      this.props.onValidate(value, 'This field is required')
    } else if(min !== undefined && Number(value) < min) {
      this.props.onValidate(value, `This field must be greater than or equal to  ${min}`)
    } else if(max !== undefined && Number(value) > max) {
      this.props.onValidate(value, `This field must be less than or equal to ${max}`)
    } else {
      this.props.onValidate(value)
    }
  }

}

export default Ratefield
