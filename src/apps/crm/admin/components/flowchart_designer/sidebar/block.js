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
    const { connectDragSource, label, icon, type } = this.props
    return connectDragSource(
      <div className="flowchart-designer-block">
        <div className={`flowchart-designer-block-icon flowchart-designer-icon-${type}`}>
          <i className={`fa fa-fw fa-${ icon }`} />
        </div>
        <div className="flowchart-designer-block-label">
          { label }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.connectDragPreview(this._getEmptyImage())
  }

  _getEmptyImage() {
    const emptyImage = new Image()
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    return emptyImage
  }

}

const source = {
  beginDrag: (props) => ({
    action: props.action,
    type: props.type,
    icon: props.icon
  })
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

Block = DragSource('ITEM', source, sourceCollector)(Block)

export default Block
