import PropTypes from 'prop-types'
import React from 'react'

class TextArea extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string
  }

  input = null
  offset = 0

  _handleKeyUp = this._handleKeyUp.bind(this)

  render() {
    return (
      <div className="maha-textarea">
        <textarea ref={ node => this.input = node } { ...this._getTextArea() } />
      </div>
    )
  }

  componentDidMount() {
    this.input.style.boxSizing = 'border-box'
    this.offset = this.input.offsetHeight - this.input.clientHeight
  }

  _getTextArea() {
    const { code, name, placeholder } = this.props
    return {
      id: code,
      name,
      placeholder,
      rows: 3,
      onKeyUp: this._handleKeyUp
    }
  }

  _handleKeyUp(e) {
    this.input.style.height = 'auto'
    this.input.style.height = this.input.scrollHeight + this.offset + 'px'
  }

}

export default TextArea
