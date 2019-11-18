import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onFinalize: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    value: ''
  }

  input = null

  _handleChange = _.debounce(this._handleChange.bind(this), 250, { leading: true })
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-input maha-textfield">
        <div className="maha-input-field">
          <input ref={ node => this.input = node } { ...this._getInput() } />
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
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
      if(status === 'finalizing') this._handleFinalize()
    }
  }

  _getInput() {
    const { code, name, placeholder } = this.props
    const { value } = this.state
    return {
      id: code,
      type: 'text',
      name,
      placeholder,
      onChange: this._handleUpdate,
      value
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

  _handleFinalize() {
    this.props.onFinalize(this.state.value)
  }

  _handleUpdate(e) {
    if(e.which == 13) return
    this.setState({
      value: e.target.value
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

export default TextField
