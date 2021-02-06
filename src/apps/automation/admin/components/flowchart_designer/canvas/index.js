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
    zoom: 0
  }

  _handleZoom = this._handleZoom.bind(this)

  render() {
    return (
      <div className="flowchart-canvas">
        <div className="flowchart-canvas-body">
          <div className="flowchart">
            <div className="flowchart-inner" style={ this._getStyle() }>
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

  _getStyle() {
    const { zoom } = this.state
    const scale = 1 - ((zoom * 4) / 100)
    return {
      transform: `scale(${scale})`
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

  _handleZoom(e) {
    this.setState({
      zoom: Math.floor(e.target.value)
    })
  }

}

export default Canvas
