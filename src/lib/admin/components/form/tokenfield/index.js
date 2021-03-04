import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TokenField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    originalValue: PropTypes.object,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter a name',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    token: '',
    value: ''
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { token, value } = this.state
    return (
      <div className="crm-tokenfield">
        <div className="crm-tokenfield-field">
          <div className="maha-input">
            <div className="maha-input-field">
              <input { ...this._getInput() } />
            </div>
            { value &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="crm-tokenfield-token">
          <strong>TOKEN:</strong> { token.length > 0 ?
            <span className="crm-tokenfield-token-text">{ token }</span> :
            <span>none</span>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, originalValue } = this.props
    const value = defaultValue || originalValue
    if(value) this._handleSet(value)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(!_.isEqual(value, prevState.value)) {
      this._handleChange()
    }
  }

  _getInput() {
    const { placeholder, tabIndex } = this.props
    const { value } = this.state
    return {
      type: 'text',
      placeholder,
      tabIndex,
      value,
      onChange: this._handleUpdate
    }
  }

  _getToken(value) {
    return value.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '_').toLowerCase()
  }

  _handleChange() {
    const { token, value } = this.state
    this.props.onChange({ token, value })
  }

  _handleClear() {
    this.setState({
      token: '',
      value: ''
    })
  }

  _handleSet(value) {
    value.token = value.token || this._getToken(value.value)
    this.setState(value)
  }

  _handleUpdate(e) {
    const value = e.target.value
    const token = this._getToken(value)
    this.setState({ token, value })
  }

}

export default TokenField
