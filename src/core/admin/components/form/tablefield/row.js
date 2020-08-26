import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

class Row extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    index: PropTypes.number,
    isDragging: PropTypes.bool,
    reorderable: PropTypes.bool,
    row: PropTypes.object,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, columns, index, reorderable } = this.props
    const row = (
      <div className={ this._getClass() }>
        { reorderable &&
          <div className="maha-tablefield-handle">
            <i className="fa fa-fw fa-bars" />
          </div>
        }
        { columns.map((column, index) => (
          <div className="maha-tablefield-column" key={`column_${index}`}>
            <input { ...this._getInput(column) } />
          </div>
        ))}
        <div className="maha-tablefield-actions" onClick={ this._handleRemove.bind(this, index) }>
          <i className="fa fa-fw fa-remove" />
        </div>
      </div>
    )
    if(!reorderable) return row
    return connectDragSource(connectDropTarget(connectDragPreview(row)))
  }

  _getInput(column) {
    const { index, row } = this.props
    return {
      type: 'text',
      value: row[column.key],
      onChange: this._handleUpdate.bind(this, index, column.key)
    }
  }

  _getClass() {
    const { isDragging } = this.props
    const classes = ['maha-tablefield-row']
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleUpdate(index, key, e) {
    this.props.onUpdate(index, key, e.target.value)
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    onReorder: props.onReorder
  }),
  endDrag: (props, monitor, component) => {
    const source = monitor.getItem()
    const target = monitor.getDropResult()
    if(!target) return
    source.onReorder(source.index, target.index)
  }
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    props.onReorder(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
  drop: (props, monitor, component) => ({
    index: props.index
  })
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

Row = DragSource('ITEM', source, sourceCollector)(Row)
Row = DropTarget('ITEM', target, targetCollector)(Row)

export default Row
