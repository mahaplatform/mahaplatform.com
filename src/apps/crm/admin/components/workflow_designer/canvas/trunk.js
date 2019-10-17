import PropTypes from 'prop-types'
import Target from './target'
import React from 'react'
import Box from './box'
import _ from 'lodash'

class Trunk extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    boxes: PropTypes.array,
    blocks: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
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
          <div className="workflow-segment" key={`box_${index}`} data-delta={ index }>
            { !(boxes[0].type === 'trigger' && index === 0) && hovering && index === delta &&
              <Target key={`dropzone_${index}`} />
            }
            <Box { ...this._getBox(box, index) } />
            { (index < boxes.length - 1) &&
              <div className="workflow-connector" key={`box_connector_${index}`}>
                <div className="workflow-line" />
              </div>
            }
          </div>
        )) }
      </div>
    )
  }

  _getBox(box, index) {
    const { active, blocks, onAdd, onEdit, onRemove } = this.props
    return {
      box,
      active,
      blocks,
      index,
      onAdd,
      onEdit,
      onRemove
    }
  }

  _getDropZone() {
    return {
      className: 'workflow-segments',
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
    const { blocks } = this.props
    const { delta } = this.state
    e.preventDefault()
    e.stopPropagation()
    const parent = this._getParent(e.target, '.workflow-branches')
    const answer = this._getParent(e.target, '.workflow-branch')
    const type = e.dataTransfer.getData('type')
    const subtype = e.dataTransfer.getData('subtype')
    const search = subtype ? { type, subtype } : { type }
    const block = _.find(blocks, search)
    this.props.onAdd({
      id: null,
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      type: block.type,
      subtype: block.subtype,
      delta: delta - 1,
      parent: parent ? parent.dataset.parent : null,
      answer: answer ? answer.dataset.answer : null,
      config: block.config
    })
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
    const segment = this._getParent(target, '.workflow-segment')
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
