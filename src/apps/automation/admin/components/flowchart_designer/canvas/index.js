import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'

class Canvas extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    boxes: PropTypes.array,
    editable: PropTypes.bool,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onHover: PropTypes.func,
    onNew: PropTypes.func,
    onRemove: PropTypes.func
  }

  state = {
    dragging: false,
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    zoom: 5
  }

  _handleMoveStart = this._handleMoveStart.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleMoveEnd = this._handleMoveEnd.bind(this)
  _handleZoom = this._handleZoom.bind(this)
  _handleWheel = this._handleWheel.bind(this)

  render() {
    console.log(this.props.boxes)
    return (
      <div className="flowchart-canvas">
        <div className="flowchart-canvas-body" { ...this._getBody() }>
          <div className="flowchart" style={ this._getOuter() }>
            <div className="flowchart-inner" style={ this._getInner() }>
              <Trunk { ...this._getTrunk() } />
            </div>
          </div>
        </div>
        <div className="flowchart-canvas-footer">
          <input { ...this._getRange() } />
        </div>
      </div>
    )
  }

  _getCoordinates(e) {
    return {
      x: e.touches ? e.touches[0].clientX : e.clientX,
      y: e.touches ? e.touches[0].clientY : e.clientY
    }
  }

  _getBody() {
    return {
      onTouchStart: this._handleMoveStart,
      onTouchMove: this._handleMove,
      onTouchEnd: this._handleMoveEnd,
      onMouseDown: this._handleMoveStart,
      onMouseMove: this._handleMove,
      onMouseUp: this._handleMoveEnd,
      onWheel: this._handleWheel
    }
  }

  _getInner() {
    const { zoom } = this.state
    const scale = 1.2 - ((zoom * 4) / 100)
    return {
      transform: `scale(${scale})`
    }
  }

  _getOuter() {
    const { current, start, offset } = this.state
    const offsetX = offset.x + (start.x - current.x)
    const offsetY = offset.y + (start.y - current.y)
    return {
      transform: `translate(calc(-50% - ${offsetX}px), calc(-50% - ${offsetY}px))`
    }
  }

  _getRange() {
    const { zoom } = this.state
    return {
      type: 'range',
      min: 0,
      max: 11,
      value: zoom,
      onChange: this._handleZoom
    }
  }

  _getTrunk() {
    const { active, blocks, boxes, editable, fields, hovering, onAdd, onEdit, onHover, onNew, onRemove } = this.props
    return {
      active,
      answer: null,
      boxes: [
        ...boxes,
        { parent: null, answer: null, type: 'ending', action: null }
      ],
      blocks,
      editable,
      fields,
      parent: null,
      hovering,
      onAdd,
      onEdit,
      onHover,
      onNew,
      onRemove
    }
  }

  _handleMoveStart(e) {
    this.setState({
      start: this._getCoordinates(e),
      current: this._getCoordinates(e),
      dragging: true
    })
  }

  _handleMove(e) {
    const { dragging } = this.state
    if(!dragging) return
    this.setState({
      current: this._getCoordinates(e)
    })
  }

  _handleMoveEnd(e) {
    const { current, offset, start } = this.state
    this.setState({
      dragging: false,
      start: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
      offset: {
        x: offset.x + (start.x - current.x),
        y: offset.y + (start.y - current.y)
      }
    })
  }

  _handleWheel(e) {
    const { zoom } = this.state
    this.setState({
      zoom: Math.max(Math.min(zoom + (e.deltaY < 0 ? 1 : -1), 11), 0)
    })
  }

  _handleZoom(e) {
    this.setState({
      zoom: Math.floor(e.target.value)
    })
  }

}

export default Canvas
