import DragLayer from './drag_layer'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class DnD extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    items: PropTypes.array,
    selected: PropTypes.array,
    onMove: PropTypes.func,
    onSelect: PropTypes.func
  }

  state = {
    dragging: false,
    item: null,
    position: null,
    start: null
  }

  _handleMouseDown = this._handleMouseDown.bind(this)
  _handleMouseLeave = this._handleMouseLeave.bind(this)
  _handleMouseMove = this._handleMouseMove.bind(this)
  _handleMouseUp = this._handleMouseUp.bind(this)
  _handleMove = _.throttle(this._handleMove.bind(this), 25)

  render() {
    const { start, dragging } = this.state
    return (
      <div { ...this._getDnD() }>
        { this.props.children }
        { dragging && <DragLayer { ...this._getDragLayer() } /> }
        { false && start && <div { ...this._getBoundingBox() } /> }
      </div>
    )
  }

  _getAllowed(item, target) {
    return target && target.type === 'folder' && item && target.code !== item.code
  }

  _getBoundingBox() {
    const { dragging, position, start } = this.state
    if(dragging || start === null) return {}
    return {
      className: 'drive-dnd-bounding-box',
      style: {
        left: Math.min(start.x, position.x) - 45,
        top: Math.min(start.y, position.y) - 265,
        width: Math.max(start.x, position.x) - Math.min(start.x, position.x),
        height: Math.max(start.y, position.y) - Math.min(start.y, position.y)
      }
    }
  }

  _getDistance(s, p) {
    const w = Math.max(s.x, p.x) - Math.min(s.x, p.x)
    const h = Math.max(s.y, p.y) - Math.min(s.y, p.y)
    return Math.floor(Math.sqrt(w * w + h * h))
  }

  _getDnD() {
    return {
      className: 'drive-dnd',
      onMouseDown: this._handleMouseDown,
      onMouseLeave: this._handleMouseLeave,
      onMouseMove: this._handleMouseMove,
      onMouseUp: this._handleMouseUp
    }
  }

  _getDragLayer() {
    const { item, position } = this.state
    const { selected } = this.props
    return {
      item,
      position: {
        x: position.x,
        y: position.y - 175
      },
      selected
    }
  }

  _getItem(code) {
    const { items } = this.props
    return _.find(items, { code })
  }

  _handleMouseDown(e) {
    const { onSelect } = this.props
    const draggable = e.target.closest('.drive-item')
    const item = draggable ? this._getItem(draggable.dataset.code) : null
    if(item) onSelect(item, e.shiftKey, e.ctrlKey, e.metaKey)
    const coordinates = {
      x: e.screenX,
      y: e.screenY
    }
    this.setState({
      item,
      position: coordinates,
      start: coordinates
    })
  }

  _handleMouseLeave(e) {
    this.setState({
      dragging: false,
      item: null,
      position: null,
      start: null
    })
  }

  _handleMouseMove(e) {
    if(!this.state.start) return
    const dropable = e.target.closest('.drive-item')
    this._handleMove({
      x: e.screenX,
      y: e.screenY
    },
    dropable)
  }

  _handleMove(position, dropable) {
    const { item, start, dragging } = this.state
    const distance = this._getDistance(start, position)
    this.setState({
      dragging: dragging || (item && distance > 10),
      position
    })
  }

  _handleMouseUp(e) {
    const { item, start } = this.state
    if(!start) return
    const dropable = e.target.closest('.drive-item')
    const target = dropable ? this._getItem(dropable.dataset.code) : null
    if(this._getAllowed(item, target)) this.props.onMove(target)
    this.setState({
      dragging: false,
      item: null,
      position: null,
      start: null
    })
  }

}

export default DnD
