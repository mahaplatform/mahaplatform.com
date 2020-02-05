import Placeholder from './placeholder'
import PropTypes from 'prop-types'
import React from 'react'
import Box from './box'

class Trunk extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    answer: PropTypes.string,
    boxes: PropTypes.array,
    blocks: PropTypes.array,
    fields: PropTypes.array,
    parent: PropTypes.string,
    hovering: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onHover: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    const { boxes } = this.props
    return (
      <div className="flowchart-segments">
        { boxes.map((box, index) => (
          <Box { ...this._getBox(box, index) } key={`box_${index}`} />
        )) }
        <Placeholder { ...this._getPlaceholder(boxes.length) } />
      </div>
    )
  }

  _getBox(box, delta) {
    const { active, answer, blocks, fields, hovering, parent, onAdd, onEdit, onHover, onMove, onRemove } = this.props
    return {
      answer,
      box,
      active,
      blocks,
      delta,
      fields,
      parent,
      hovering,
      onAdd,
      onEdit,
      onHover,
      onMove,
      onRemove
    }
  }

  _getPlaceholder(delta) {
    const { answer, hovering, parent, onAdd, onHover } = this.props
    return {
      answer,
      delta,
      hovering,
      parent,
      onAdd,
      onHover
    }
  }

}

export default Trunk
