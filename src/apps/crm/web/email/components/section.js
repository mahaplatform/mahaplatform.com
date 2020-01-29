import PropTypes from 'prop-types'
import Target from './target'
import Block from './block'
import React from 'react'

class Section extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    config: PropTypes.object,
    onAction: PropTypes.func
  }

  state = {
    hovering: false,
    index: 0
  }

  _handleDrop = this._handleDrop.bind(this)
  _handleDragEnter = this._handleDragEnter.bind(this)
  _handleDragLeave = this._handleDragLeave.bind(this)
  _handleDragOver = this._handleDragOver.bind(this)

  render() {
    const { hovering, index } = this.state
    const { config } = this.props
    const { blocks } = config
    return (
      <div { ...this._getDropZone() }>
        { hovering &&
          <div className="dropzone-highlight" data-label="Foo" />
        }
        <table className="section">
          <tbody>
            <tr>
              <td>
                { (blocks.length === 0 || (hovering && index === 0)) &&
                  <Target />
                }
                { blocks.map((block, blockIndex) => (
                  <div key={`block_${blockIndex}`} className="dropzone-block" data-index={ blockIndex }>
                    <Block { ...this._getBlock(block, blockIndex) } />
                    { hovering && blockIndex + 1 === index &&
                      <Target key={`target_${blockIndex}`} />
                    }
                  </div>
                )) }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  _getBlock(config, blockIndex) {
    const { active, onAction } = this.props
    return {
      active,
      blockIndex,
      config,
      onAction
    }
  }

  _getDropZone() {
    return {
      className: 'dropzone',
      onDragEnter: this._handleDrag.bind(this, 'enter'),
      onDragOver: this._handleDrag.bind(this, 'over'),
      onDrop: this._handleDrop
    }
  }

  _getMiddle(el) {
    const rect = el.getBoundingClientRect()
    return rect.y + (rect.height / 2)
  }

  _getParent(el, selector) {
    const matches = (el.matches || el.matchesSelector)
    while ((el = el.parentElement) && !(matches.call(el, selector))) { null }
    return el
  }

  _handleDrag(action, e) {
    e.preventDefault()
    e.stopPropagation()
    if(action === 'enter') this._handleDragEnter()
    if(action === 'over') this._handleDragOver(e.target, e.currentTarget, e.clientX, e.clientY)
  }

  _handleDrop(e) {
    const { index } = this.state
    const { onAction } = this.props
    e.preventDefault()
    e.stopPropagation()
    onAction('add', {
      type: e.dataTransfer.getData('type'),
      index
    })
    this.setState({
      hovering: false,
      index: 0
    })
  }

  _handleDragEnter() {
    this._handleHover(true)
  }

  _handleDragLeave() {
    this._handleHover(false)
  }

  _handleDragOver(target, dropzone, x, y) {
    const { blocks } = this.props.config
    const block = this._getParent(target, '.dropzone-block')
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(this._handleDragLeave, 100)
    if(block) {
      const blockIndex = parseInt(block.dataset.index)
      const middle = this._getMiddle(block)
      if(y <= middle) return this._handleIndex(blockIndex)
      if(y > middle) return this._handleIndex(blockIndex + 1)
    }
    const middle = this._getMiddle(dropzone)
    if(y <= middle) return this._handleIndex(0)
    if(y > middle) return this._handleIndex(blocks.length)
  }

  _handleHover(hovering) {
    this.setState({ hovering })
  }

  _handleIndex(index) {
    this.setState({ index })
  }

}

export default Section
