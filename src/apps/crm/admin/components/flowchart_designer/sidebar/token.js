import PropTypes from 'prop-types'
import React from 'react'

class Token extends React.Component {

  static propTypes = {
    label: PropTypes.string
  }

  label = null

  _handleCopy = this._handleCopy.bind(this)

  render() {
    const { label } = this.props
    return (
      <div className="designer-token">
        <div className="designer-token-label" ref={ node => this.label = node }>
          &lt;%- { label } %&gt;
        </div>
        <div className="designer-token-icon" onClick={ this._handleCopy }>
          <i className="fa fa-clipboard" />
        </div>
      </div>
    )
  }

  _handleCopy() {
    if(document.body.createTextRange) {
      const range = document.body.createTextRange()
      range.moveToElementText(this.label)
      range.select()
      document.execCommand('copy')
    } else if(window.getSelection) {
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(this.label)
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      selection.removeAllRanges()
    }
  }

}

export default Token
