import PropTypes from 'prop-types'
import React from 'react'

class DateField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string
  }

  state = {
    value: ''
  }

  input = null

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-datefield">
        <div className="maha-datefield-field">
          <div className="maha-input">
            <div className="maha-input-field">
              <input ref={ node => this.input = node } { ...this._getInput() } />
            </div>
            { value && value.length > 0 &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="maha-datefield-icon">
          <i className="fa fa-calendar" />
        </div>
      </div>
    )
  }

  _getInput() {
    const { code, name, placeholder } = this.props
    const { value } = this.state
    return {
      id: code,
      type: 'text',
      name,
      placeholder,
      onChange: this._handleChange,
      value
    }
  }

  _handleChange(e) {
    if(e.which == 13) return
    this.setState({
      value: e.target.value
    })
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

}

export default DateField
