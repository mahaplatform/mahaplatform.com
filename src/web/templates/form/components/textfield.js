import PropTypes from 'prop-types'
import React from 'react'

class TextField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string
  }

  input = null

  render() {
    return (
      <div className="maha-textfield">
        <input ref={ node => this.input = node } { ...this._getInput() } />
      </div>
    )
  }

  _getInput() {
    const { code, name, placeholder } = this.props
    return {
      id: code,
      type: 'text',
      name,
      placeholder
    }
  }

}

export default TextField
