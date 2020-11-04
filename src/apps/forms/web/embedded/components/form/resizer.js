import elementResizeEvent from 'element-resize-event'
import PropTypes from 'prop-types'
import React from 'react'

class Resizer extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    embedded: PropTypes.any,
    onResize: PropTypes.func
  }

  element = null

  _handleResize = this._handleResize.bind(this)

  render() {
    return (
      <div className="maha-form" ref={ node => this.element = node }>
        { this.props.children }
      </div>
    )
  }

  componentDidMount() {
    if(!this.props.embedded) return
    elementResizeEvent(this.element, this._handleResize)
    this._handleResize()
  }

  _getHeight(prop) {
    const retVal = document.defaultView.getComputedStyle(this.element, null)
    return !retVal ? parseInt(retVal[prop], 10) : 0
  }

  _handleResize() {
    const height = this.element.offsetHeight + this._getHeight('marginTop') + this._getHeight('marginBottom')
    this.props.onResize(height)
  }

}

export default Resizer
