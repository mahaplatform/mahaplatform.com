import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import React from 'react'

class Item extends React.Component {

  static propTypes = {
    checked: PropTypes.bool,
    index: PropTypes.number,
    label: PropTypes.string,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    onToggle: PropTypes.func
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { label, connectDropTarget, connectDragPreview, connectDragSource } = this.props
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        <div className="maha-sortable-list-icon">
          <i className="fa fa-bars" />
        </div>
        <div className="maha-sortable-list-label">
          { label }
        </div>
        <div className="maha-sortable-list-icon" onClick={ this._handleToggle}>
          <i className={`fa fa-fw fa-${this._getIcon()}`} />
        </div>
      </div>
    )))
  }

  _getClass() {
    const { checked } = this.props
    const classes = ['maha-sortable-list-item']
    if(!checked) classes.push('disabled')
    return classes.join(' ')
  }

  _getIcon() {
    return this.props.checked ? 'check-circle' : 'square-o'
  }

  _handleToggle() {
    this.props.onToggle(this.props.index)
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    label: props.label,
    checked: props.checked
  })
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
    props.onMove(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const targetCollector = (connect) => ({
  connectDropTarget: connect.dropTarget()
})

Item = DragSource('ITEM', source, sourceCollector)(Item)
Item = DropTarget('ITEM', target, targetCollector)(Item)

export default Item
