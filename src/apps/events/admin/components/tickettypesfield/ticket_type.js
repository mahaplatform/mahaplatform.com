import TicketTypeToken from '../../tokens/ticket_type'
import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

class TicketType extends React.PureComponent {

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    index: PropTypes.number,
    isDragging: PropTypes.bool,
    ticket_type: PropTypes.object,
    onEdit: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {
    isDragging: false
  }

  _handleEdit = this._handleEdit.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, ticket_type } = this.props
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        <div className="tickettypesfield-tickettype-handle">
          <i className="fa fa-bars" />
        </div>
        <div className="tickettypesfield-tickettype-token">
          <TicketTypeToken { ...ticket_type } />
        </div>
        <div className="tickettypesfield-tickettype-action" onClick={ this._handleEdit }>
          <i className="fa fa-pencil" />
        </div>
        <div className="tickettypesfield-tickettype-action" onClick={ this._handleRemove }>
          { ticket_type.is_active ?
            <i className="fa fa-times" /> :
            <i className="fa fa-refresh" />
          }
        </div>
      </div>
    )))
  }

  _getClass() {
    const { isDragging } = this.props
    const classes = ['tickettypesfield-tickettype']
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _handleEdit(ticket_type, index) {
    this.props.onEdit(ticket_type, index)
  }

  _handleRemove(ticket_type, index) {
    this.props.onRemove(ticket_type, index)
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
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

TicketType = DragSource('ITEM', source, sourceCollector)(TicketType)
TicketType = DropTarget('ITEM', target, targetCollector)(TicketType)

export default TicketType
