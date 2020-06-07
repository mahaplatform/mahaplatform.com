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

class KeyPad extends React.Component {

  static propTypes = {
    onChoose: PropTypes.func
  }

  _handleKeyDown = this._handleKeyDown.bind(this)

  render() {
    return (
      <div className="maha-phone-keypad">
        { cells.map((cell, index) => (
          <div key={`cell_${index}`} className="maha-phone-keypad-cell">
            <div className="maha-phone-keypad-key" onClick={ this._handleClick.bind(this, cell) }>
              <div className="maha-phone-keypad-number">
                { cell.number }
              </div>
              <div className="maha-phone-keypad-letters">
                { cell.letters }
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  componentWillMount() {
    document.addEventListener('keydown', this._handleKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown, false)
  }

  _handleClick(cell) {
    this.props.onChoose(cell.number)
  }

  _handleKeyDown(e) {
    if(e.target.tagName !== 'BODY') return
    if(!/\d/.test(e.key)) return
    this.props.onChoose(e.key)
  }

}

export default KeyPad
