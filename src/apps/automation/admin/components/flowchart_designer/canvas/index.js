import PropTypes from 'prop-types'
import { Button } from '@admin'
import Trunk from './trunk'
import React from 'react'

class Canvas extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    boxes: PropTypes.array,
    editable: PropTypes.bool,
    entity: PropTypes.string,
    expanded: PropTypes.array,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    version: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onExpand: PropTypes.func,
    onHover: PropTypes.func,
    onNew: PropTypes.func,
    onRemove: PropTypes.func
  }

  state = {
    dragging: false,
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    offset: { x: 0, y: 0 }
  }

  _handleMoveStart = this._handleMoveStart.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleMoveEnd = this._handleMoveEnd.bind(this)
  _handlePublish = this._handlePublish.bind(this)
  _handleWheel = this._handleWheel.bind(this)

  render() {
    const { version } = this.props
    return (
      <div className="flowchart-canvas">
        <div { ...this._getBody() }>
          <div className="flowchart" style={ this._getOuter() }>
            <div className="flowchart-inner">
              <Trunk { ...this._getTrunk() } />
            </div>
          </div>
        </div>
        <div className="flowchart-canvas-footer">
          <div className="flowchart-canvas-footer-status">
            { !version.is_published &&
              <span>The current version is saved, but has not been pubished</span>
            }
          </div>
          { !version.is_published &&
            <div className="flowchart-canvas-footer-save">
              <Button { ...this._getPublish(version) } />
            </div>
          }
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
    const { dragging } = this.state
    return {
      className: `flowchart-canvas-body${dragging ? ' dragging' : ''}`,
      onTouchStart: this._handleMoveStart,
      onTouchMove: this._handleMove,
      onTouchEnd: this._handleMoveEnd,
      onMouseDown: this._handleMoveStart,
      onMouseMove: this._handleMove,
      onMouseUp: this._handleMoveEnd,
      onWheel: this._handleWheel
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

  _getPublish(version) {
    return {
      label: version.unpublished_at ? 'Revert to Version' : 'Publish Version',
      color: 'green',
      size: 'tiny',
      handler: this._handlePublish
    }
  }

  _getTrunk() {
    const { active, blocks, boxes, editable, expanded, fields, hovering, onAdd, onEdit, onExpand, onHover, onNew, onRemove } = this.props
    return {
      active,
      answer: null,
      boxes: [
        ...boxes,
        { parent: null, answer: null, type: 'ending', action: null }
      ],
      blocks,
      editable,
      expanded,
      fields,
      parent: null,
      hovering,
      onAdd,
      onEdit,
      onExpand,
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
        y: offset.y - (start.y - current.y)
      }
    })
  }

  _handlePublish() {
    const { entity, version } = this.props
    this.context.network.request({
      endpoint: `/api/admin/${entity}/config/versions/publish`,
      method: 'PATCH',
      body: {
        publish_id: version.id
      },
      onFailure: () => {},
      onSuccess: () => {}
    })
  }

  _handleWheel(e) {
    const { offset } = this.state
    this.setState({
      offset: {
        x: offset.x,
        y: offset.y + (e.deltaY < 0 ? 20 : -20)
      }
    })
  }

}

export default Canvas
