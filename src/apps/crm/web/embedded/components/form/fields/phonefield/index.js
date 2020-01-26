import { AsYouType } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import React from 'react'

class PhoneField extends React.Component {

  static propTypes = {
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter phone number',
    onChange: () => {},
    onReady: () => {}
  }

  phone = null

  state = {
    value: ''
  }

  _handleUpdate = this._handleUpdate.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-phonefield">
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
      </div>
    )
  }

  componentDidMount() {
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
    const { placeholder } = this.props
    const { value } = this.state
    return {
      className: 'ui input',
      type: 'tel',
      placeholder,
      value,
      ref: node => this.phone = node,
      onChange: this._handleUpdate
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(e) {
    const asyoutype = new AsYouType('US')
    this.setState({
      value: asyoutype.input(e.target.value)
    })
  }

  _handleValidate() {
    const { required } = this.props
    const { value } = this.state
    if(required && value.length === 0) {
      this.props.onValidate('invalid', 'You must enter a value')
    } else {
      this.props.onValidate('valid')
    }
  }

}

export default PhoneField
