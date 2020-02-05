import PropTypes from 'prop-types'
import Target from './target'
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
    const { answer, boxes, hovering, parent } = this.props
    return (
      <div className="flowchart-segments">
        { boxes.map((box, index) => (
          <div className="flowchart-segment" key={`box_${index}`}>
            <Box { ...this._getBox(box, index) } />
            { hovering && parent === hovering.parent  && answer === hovering.answer && hovering.delta === index &&
              <Target />
            }
          </div>
        )) }
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

}

export default Trunk
