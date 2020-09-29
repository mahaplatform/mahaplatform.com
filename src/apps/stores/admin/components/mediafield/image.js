import { DragSource, DropTarget } from 'react-dnd'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Image extends React.PureComponent {

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    image: PropTypes.object,
    index: PropTypes.object,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, image } = this.props
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className="mediafield-image" >
        <div className="mediafield-image-handle">
          <i className="fa fa-bars" />
        </div>
        <div className="mediafield-image-image">
          <img src={`/imagecache/fit=cover&w=50&h=50/${image.asset.path}`} />
        </div>
        <div className="mediafield-image-details">
          <div className="mediafield-image-details-filename">
            { image.asset.original_file_name }
          </div>
        </div>
        <Button { ...this._getRemove() } />
      </div>
    )))
  }

  _getRemove() {
    return {
      icon: 'times',
      className: 'mediafield-image-details-action',
      confirm: 'Are you sure you want to remove this image?',
      handler: this._handleRemove
    }
  }

  _handleRemove() {
    const { index } = this.props
    this.props.onRemove(index)
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    delta: props.image.delta,
    onMove: props.onMove
  })
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    props.onMove(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

Image = DragSource('ITEM', source, sourceCollector)(Image)
Image = DropTarget('ITEM', target, targetCollector)(Image)

export default Image
