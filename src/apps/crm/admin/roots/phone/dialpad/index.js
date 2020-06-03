import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import React from 'react'

const cells = [
  { number: '1', letters: '' },
  { number: '2', letters: 'ABC' },
  { number: '3', letters: 'DEF' },
  { number: '4', letters: 'GHI' },
  { number: '5', letters: 'JKL' },
  { number: '6', letters: 'MNO' },
  { number: '7', letters: 'PQRS' },
  { number: '8', letters: 'TUV' },
  { number: '9', letters: 'WXYZ' },
  { number: '*', letters: '' },
  { number: '0', letters: '' },
  { number: '#', letters: '' }
]

class DialPad extends React.Component {

  static propTypes = {
    status: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    number: ''
  }

  _handleClear = this._handleClear.bind(this)
  _handleDial = this._handleDial.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { number } = this.state
    return (
      <div className="maha-phone-dialpad">
        <div className="maha-phone-dialpad-header">
          <div className="maha-input">
            <div className="maha-input-field">
              <input { ...this._getInput() } />
            </div>
            { number &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="maha-phone-dialpad-body">
          <div className="maha-phone-dialpad-grid">
            { cells.map((cell, index) => (
              <div key={`cell_${index}`} className="maha-phone-dialpad-cell"  onClick={ this._handleDial.bind(this, cell.number)}>
                <div className="maha-phone-dialpad-key">
                  <div className="maha-phone-dialpad-number">
                    { cell.number }
                  </div>
                  <div className="maha-phone-dialpad-letters">
                    { cell.letters }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { number } = this.state
    if(number !== prevState.number) {
      this._handleChange()
    }
  }

  _getInput() {
    const { number } = this.state
    return {
      placeholder: 'Enter Number',
      ref: node => this.input = node,
      type: 'text',
      value: number,
      onChange: this._handleType
    }
  }

  _handleChange() {
    const parsed = parsePhoneNumberFromString(this.state.number, 'US')
    const number = parsed ? parsed.number : null
    this.props.onChange(number)
  }

  _handleClear() {
    this.setState({
      number: ''
    })
  }

  _handleDial(value) {
    const { number } = this.state
    this._handleFormat(number + value)
  }

  _handleFormat(value) {
    const asyoutype = new AsYouType('US')
    const number = asyoutype.input(value)
    this.setState({ number })
  }

  _handleType(e) {
    this._handleFormat(e.target.value)
  }

}

export default DialPad
