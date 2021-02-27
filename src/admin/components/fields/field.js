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
    endpoint: PropTypes.string,
    field: PropTypes.object,
    isDragging: PropTypes.bool,
    onMove: PropTypes.func,
    onReorder: PropTypes.func
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, field } = this.props
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        <div className="maha-field-handle">
          <svg width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        <div className="maha-field-icon">
          <div className="maha-field-badge">
            <i className={`fa fa-${this._getIcon(field.type)}`} />
          </div>
        </div>
        <div className="maha-field-label">
          <strong>{ field.name.value }</strong> <span>({ field.type })</span>
        </div>
        { field.is_mutable &&
          <div className="maha-field-extra" onClick={ this._handleTasks.bind(this, field.id) }>
            <i className="fa fa-fw fa-ellipsis-v" />
          </div>
        }
      </div>
    )))
  }

  _getClass() {
    const { isDragging, field } = this.props
    const classes = ['maha-field']
    if(field.type === 'section') classes.push('section')
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _getIcon(type) {
    if(type === 'textfield') return 'font'
    if(type === 'textarea') return 'bars'
    if(type === 'checkboxgroup') return 'check-square-o'
    if(type === 'checkbox') return 'check-square'
    if(type === 'imagefield') return 'camera'
    if(type === 'emailfield') return 'envelope'
    if(type === 'addressfield') return 'map-marker'
    if(type === 'phonefield') return 'phone'
    if(type === 'datefield') return 'calendar'
    if(type === 'timefield') return 'clock-o'
    if(type === 'moneyfield') return 'dollar'
    if(type === 'radiogroup') return 'circle-o'
  }

  _handleTasks(id) {
    const { endpoint, field } = this.props
    this.context.tasks.open({
      items: [
        {
          label: 'Edit Field',
          modal: () => <Edit endpoint={ endpoint } id={ field.id } />
        }, {
          label: 'Remove Field',
          confirm: 'Are you sure you want to delete this field?',
          request: {
            method: 'DELETE',
            endpoint: `${endpoint}/${field.id}`,
            onFailure: (result) => this.context.flash.set('error', 'Unable to remove this field')
          }
        }
      ]
    })
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
    source.onReorder(source.delta, target.index)
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
