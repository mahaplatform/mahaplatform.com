import DragLayer from './drag_layer'
import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'

class Canvas extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    boxes: PropTypes.array,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onHover: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    return (
      <div className="flowchart-canvas">
        <DragLayer />
        <div className="flowchart">
          <Trunk { ...this._getTrunk() } />
        </div>
      </div>
    )
  }

  _getTrunk() {
    const { active, blocks, boxes, fields, hovering, onAdd, onEdit, onHover, onMove, onRemove } = this.props
    return {
      active,
      answer: null,
      boxes: [
        ...boxes,
        { parent: null, answer: null, type: 'ending', action: null }
      ],
      blocks,
      fields,
      parent: null,
      hovering,
      onAdd,
      onEdit,
      onHover,
      onMove,
      onRemove
    }
  }
}

export default Canvas
