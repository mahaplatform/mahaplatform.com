import PropTypes from 'prop-types'
import React from 'react'

class TimeField extends React.Component {

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
    value: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { placeholder } = this.props
    const { value } = this.state
    return (
      <div className="maha-datefield">
        <div className="maha-datefield-field">
          <div className="maha-input">
            <div className="maha-input-placeholder">
              { placeholder }
            </div>
            { value && value.length > 0 &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="maha-datefield-icon">
          <i className="fa fa-clock-o" />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { onReady } = this.props
    onReady()
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

  _handleChange() {
  }

  _handleClear() {
    this.setState({
      value: null
    })
  }

  _handleFinalize() {
    this.props.onFinalize(this.state.value)
  }

  _handleValidate() {
    this.props.onValidate('valid')
  }

}

export default TimeField