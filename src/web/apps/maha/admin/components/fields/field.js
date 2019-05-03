import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

class Field extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    field: PropTypes.object,
    isDragging: PropTypes.bool,
    parent_type: PropTypes.string,
    parent_id: PropTypes.string,
    onMove: PropTypes.func,
    onReorder: PropTypes.func
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, field } = this.props
    return connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        { connectDragSource(
          <div className="maha-field-handle">
            <i className="fa fa-fw fa-bars" />
          </div>
        ) }
        { field.type === 'section' ?
          <div className="maha-field-label">
            <strong>{ field.label }</strong>
          </div> :
          <div className="maha-field-label">
            <strong>{ field.label }</strong> <span>({ field.type })</span>
          </div>
        }
        { field.is_mutable &&
          <div className="maha-field-extra" onClick={ this._handleTasks.bind(this, field.id) }>
            <i className="fa fa-fw fa-ellipsis-v" />
          </div>
        }
      </div>
    ))
  }

  _getClass() {
    const { isDragging, field } = this.props
    const classes = ['maha-field']
    if(field.type === 'section') classes.push('section')
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _handleTasks(id) {
    const { parent_type, parent_id, field } = this.props
    this.context.tasks.open([
      {
        label: 'Edit Field',
        rights: [],
        modal: () => <Edit parent_type={ parent_type } parent_id={ parent_id } id={ field.id } />
      }, {
        label: 'Remove Field',
        rights: [],
        request: {
          method: 'DELETE',
          endpoint: `/api/admin/${parent_type}/${parent_id}/fields/${field.id}`,
          onFailure: (result) => this.context.flash.set('error', 'Unable to remove this field')
        }
      }
    ])
  }

}

const source = {
  beginDrag: (props) => ({
    parent_type: props.parent_type,
    parent_id: props.parent_id,
    index: props.index,
    delta: props.field.delta,
    onMove: props.onMove,
    onReorder: props.onReorder
  }),
  endDrag: (props, monitor, component) => {
    const source = monitor.getItem()
    const target = monitor.getDropResult()
    if(!target) return
    source.onReorder(source.parent_type, source.parent_id, source.delta, target.index)
  }
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    props.onMove(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
  drop: (props, monitor, component) => ({
    index: props.index,
    delta: props.field.delta
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

Field = DragSource('ITEM', source, sourceCollector)(Field)
Field = DropTarget('ITEM', target, targetCollector)(Field)

export default Field
