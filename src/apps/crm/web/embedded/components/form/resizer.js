import elementResizeEvent from 'element-resize-event'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'
import _ from 'lodash'

class Resizer extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    embedded: PropTypes.any
  }

  element = null
  pasteur = null

  state = {
    style: null
  }

  _handleResize = this._handleResize.bind(this)
  _handleStyle = this._handleStyle.bind(this)

  render() {
    const { style } = this.state
    return (
      <div className="maha-form" ref={ node => this.element = node }>
        { style &&
          <style type="text/css">{ this._getStyle() }</style>
        }
        { this.props.children }
      </div>
    )
  }

  componentDidMount() {
    if(!this.props.embedded) return
    elementResizeEvent(this.element, this._handleResize)
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'form',
      targetName: 'embed'
    })
    this.pasteur.send('ready')
    this.pasteur.on('style', this._handleStyle)
    this._handleResize()
  }

  componentWillUnmount() {
    if(!this.props.embedded) return
    this.pasteur.close()
  }

  _getHeight(prop) {
    const retVal = document.defaultView.getComputedStyle(this.element, null)
    return !retVal ? parseInt(retVal[prop], 10) : 0
  }

  _getStyle() {
    return this.state.style.map(item => `
      div#form div.maha-form div.ui.form ${item.selector} {
        ${Object.keys(item.styles).map(key => `
          ${_.kebabCase(key)}: ${item.styles[key]};
        `).join('')}
      }
    `).join('')
  }

  _handleResize() {
    const height = this.element.offsetHeight + this._getHeight('marginTop') + this._getHeight('marginBottom')
    this.pasteur.send('resize', height)
  }

  _handleStyle(style) {
    this.setState({ style })
  }

}

export default Resizer
