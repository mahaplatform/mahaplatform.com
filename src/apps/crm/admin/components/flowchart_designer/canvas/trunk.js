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
      <div className="flowchart-segments">
        { boxes.map((box, index) => (
          <div { ...this._getSegment(index) } key={`box_${index}`}>
            { !(boxes[0].type === 'trigger' && index === 0) && hovering && index === delta &&
              <Target key={`dropzone_${index}`} />
            }
            <Box { ...this._getBox(box, index) } />
          </div>
        )) }
        { (boxes.length === 0 || boxes[boxes.length - 1].type !== 'ending') &&
          <div { ...this._getSegment(boxes.length) }>
            { hovering && delta === boxes.length &&
              <Target />
            }
          </div>
        }
      </div>
    )
  }

  _getBox(box, index) {
    const { active, blocks, fields, onAdd, onEdit, onMove, onRemove } = this.props
    return {
      box,
      active,
      blocks,
      index,
      fields,
      onAdd,
      onEdit,
      onMove,
      onRemove
    }
  }

  _getSegment(index) {
    return {
      className: 'flowchart-segment',
      'data-delta': index,
      onDragEnter: this._handleDragEnter.bind(this),
      onDragOver: this._handleDragOver.bind(this),
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

  _handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    const { onAdd, onMove } = this.props
    const { delta } = this.state
    const segment = e.currentTarget
    const parentEl = this._getParent(segment, '.flowchart-branches')
    const answerEl = this._getParent(segment, '.flowchart-branch')
    const parent = parentEl ? parentEl.dataset.parent : null
    const answer = answerEl ? answerEl.dataset.answer : null
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

  _handleDragEnter(e) {
    e.preventDefault()
    e.stopPropagation()
    this._handleHover(true)
  }

  _handleDragLeave() {
    this._handleHover(false)
  }

  _handleDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    const segment = e.currentTarget
    const y = e.clientY
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(this._handleDragLeave, 100)
    const delta = parseInt(segment.dataset.delta)
    const middle = this._getMiddle(segment)
    if(y <= middle) return this._handleDelta(delta)
    if(y > middle) return this._handleDelta(delta + 1)
  }

  _handleHover(hovering) {
    this.setState({ hovering })
  }

  _handleDelta(delta) {
    this.setState({ delta })
  }

}

export default Trunk
