import PropTypes from 'prop-types'
import Target from './target'
import React from 'react'
import Box from './box'

class Trunk extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    boxes: PropTypes.array,
    blocks: PropTypes.array,
    fields: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  state = {
    delta: 0,
    hovering: false
  }

  _handleDrop = this._handleDrop.bind(this)
  _handleDragEnter = this._handleDragEnter.bind(this)
  _handleDragLeave = this._handleDragLeave.bind(this)
  _handleDragOver = this._handleDragOver.bind(this)

  render() {
    const { delta, hovering } = this.state
    const { boxes } = this.props
    return (
      <div { ...this._getDropZone()}>
        { boxes.map((box, index) => (
          <div className="flowchart-segment" key={`box_${index}`} data-delta={ index }>
            { !(boxes[0].type === 'trigger' && index === 0) && hovering && index === delta &&
              <Target key={`dropzone_${index}`} />
            }
            <Box { ...this._getBox(box, index) } />
          </div>
        )) }
        { (boxes.length === 0 || boxes[boxes.length - 1].type !== 'ending') &&
          <div className="flowchart-segment" data-delta={ boxes.length }>
            { hovering && delta === 0 &&
              <Target />
            }
          </div>
        }
      </div>
    )
  }

  _getBox(box, index) {
    const { active, blocks, fields, onAdd, onEdit, onRemove } = this.props
    return {
      box,
      active,
      blocks,
      index,
      fields,
      onAdd,
      onEdit,
      onRemove
    }
  }

  _getDropZone() {
    return {
      className: 'flowchart-segments',
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
    const { onAdd, onMove } = this.props
    const { delta } = this.state
    e.preventDefault()
    e.stopPropagation()
    const parent = this._getParent(e.target, '.flowchart-branches')
    const answer = this._getParent(e.target, '.flowchart-branch')
    const code = e.dataTransfer.getData('code')
    const type = e.dataTransfer.getData('type')
    const action = e.dataTransfer.getData('action')
    if(type) onAdd(type, action, parent, answer, delta)
    if(code) onMove(code, parent, answer, delta)
    this.setState({
      delta: 0,
      hovering: false
    })
  }

  _handleDragEnter() {
    this._handleHover(true)
  }

  _handleDragLeave() {
    this._handleHover(false)
  }

  _handleDragOver(target, dropzone, x, y) {
    const segment = this._getParent(target, '.flowchart-segment')
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(this._handleDragLeave, 100)
    if(segment) {
      const delta = parseInt(segment.dataset.delta)
      const middle = this._getMiddle(segment)
      if(y <= middle) return this._handleDelta(delta)
      if(y > middle) return this._handleDelta(delta + 1)
    }
    const middle = this._getMiddle(dropzone)
    if(y <= middle) return this._handleDelta(0)
  }

  _handleHover(hovering) {
    this.setState({ hovering })
  }

  _handleDelta(delta) {
    this.setState({ delta })
  }

}

export default Trunk
