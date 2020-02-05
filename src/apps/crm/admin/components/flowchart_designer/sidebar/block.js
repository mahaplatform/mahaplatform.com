import { DragSource } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

class Block extends React.Component {

  static propTypes = {
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    delta: PropTypes.number,
    label: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    parent: PropTypes.string
  }

  render() {
    const { connectDragPreview, connectDragSource, label, icon, type } = this.props
    return connectDragSource(connectDragPreview(
      <div className="flowchart-designer-block">
        <div className={`flowchart-designer-block-icon flowchart-designer-icon-${type}`}>
          <i className={`fa fa-fw fa-${ icon }`} />
        </div>
        <div className="flowchart-designer-block-label">
          { label }
        </div>
      </div>
    ))
  }

}

const source = {
  beginDrag: (props) => ({
    action: props.action,
    type: props.type
  })
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

Block = DragSource('ITEM', source, sourceCollector)(Block)

export default Block
