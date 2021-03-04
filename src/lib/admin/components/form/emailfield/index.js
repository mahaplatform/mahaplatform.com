import PropTypes from 'prop-types'
import React from 'react'

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

class EmailField extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onUnique: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter Email Address',
    onChange: () => {},
    onReady: () => {}
  }

  email = null

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-input">
        <div className="maha-input-field">
          <input { ...this._getInput() }/>
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
    if(defaultValue) this.setState({ value: defaultValue })
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.value !== prevState.value) {
      this.props.onChange(this.state.value)
    }
  }

  _getInput() {
    const { placeholder, tabIndex } = this.props
    const { value } = this.state
    return {
      className: 'ui input',
      type: 'email',
      placeholder,
      tabIndex,
      value,
      ref: node => this.email = node,
      onChange: this._handleChange
    }
  }

  _handleChange() {
    this.setState({
      value: this.email.value
    })
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleValidate() {
    const { network } = this.context
    const { value } = this.state
    const { required, onUnique } = this.props
    if(required && (!value || value.length === 0)) {
      return this.props.onValid(null, ['This field is required'])
    }
    if(value.length > 0 && !EMAIL_REGEX.test(value)) {
      return this.props.onValid(value, ['Enter a valid email format'])
    }
    if(!onUnique) return this.props.onValid(value)
    onUnique({
      value,
      network,
      onValid: this.props.onValid
    })
  }
}

export default EmailField
