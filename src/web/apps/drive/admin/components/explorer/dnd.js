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
        { start && <div { ...this._getBoundingBox() } /> }
      </div>
    )
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
      dragging: draggable !== null,
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
    this._handleMove({
      x: e.screenX,
      y: e.screenY
    })
  }

  _handleMove(position) {
    this.setState({ position })
  }

  _handleMouseUp(e) {
    if(!this.state.start) return
    const { onMove } = this.props
    const dropable = e.target.closest('.drive-item')
    const item = dropable ? this._getItem(dropable.dataset.code) : null
    if(item && item.type === 'folder') onMove(item)
    this.setState({
      dragging: false,
      item: null,
      position: null,
      start: null
    })
  }

}

export default DnD
