import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TokenField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    placeholder: PropTypes.string,
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
    const { defaultValue } = this.props
    if(defaultValue) this.setState(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(!_.isEqual(value, prevState.value)) {
      this._handleChange()
    }
  }

  _getInput() {
    const { placeholder } = this.props
    const { value } = this.state
    return {
      type: 'text',
      value,
      placeholder,
      onChange: this._handleUpdate
    }
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

  _handleUpdate(e) {
    const value = e.target.value
    const token = value.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '_').toLowerCase()
    this.setState({ token, value })
  }

}

export default TokenField
