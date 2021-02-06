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
    zoom: 0
  }

  _handleMouseDown = this._handleMouseDown.bind(this)
  _handleMouseMove = this._handleMouseMove.bind(this)
  _handleMouseUp = this._handleMouseUp.bind(this)
  _handleZoom = this._handleZoom.bind(this)

  render() {
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

  _getBody() {
    return {
      onMouseDown: this._handleMouseDown,
      onMouseMove: this._handleMouseMove,
      onMouseUp: this._handleMouseUp
    }
  }

  _getInner() {
    const { zoom } = this.state
    const scale = 1 - ((zoom * 4) / 100)
    return {
      transform: `scale(${scale})`
    }
  }

  _getOuter() {
    const { current, start, offset } = this.state
    const offsetX = offset.x + (start.x - current.x)
    const offsetY = offset.y - (start.y - current.y)
    return {
      transform: `translate(calc(-50% - ${offsetX}px), ${offsetY}px)`
    }
  }

  _getRange() {
    const { zoom } = this.state
    return {
      type: 'range',
      min: 0,
      max: 10,
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

  _handleMouseDown(e ) {
    this.setState({
      start: {
        x: e.clientX ,
        y: e.clientY
      },
      current: {
        x: e.clientX ,
        y: e.clientY
      },
      dragging: true
    })
  }

  _handleMouseMove(e) {
    const { dragging } = this.state
    if(!dragging) return
    this.setState({
      current: {
        x: e.clientX,
        y: e.clientY
      }
    })
  }

  _handleMouseUp(e) {
    const { current, offset, start } = this.state
    this.setState({
      dragging: false,
      start: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
      offset: {
        x: offset.x + (start.x - current.x),
        y: offset.y - (start.y - current.y)
      }
    })
  }

  _handleZoom(e) {
    this.setState({
      zoom: Math.floor(e.target.value)
    })
  }

}

export default Canvas
