import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

class Question extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    index: PropTypes.number,
    isDragging: PropTypes.bool,
    question: PropTypes.object,
    quiz: PropTypes.object,
    onMove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleEdit = this._handleEdit.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, question } = this.props
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        <div className="question-handle">
          <i className="fa fa-fw fa-bars" />
        </div>
        <div className="question-label">
          { question.text }
        </div>
        <div className="question-extra" onClick={ this._handleEdit }>
          <i className="fa fa-fw fa-pencil" />
        </div>
        <div className="question-extra" onClick={ this._handleRemove }>
          <i className="fa fa-fw fa-times" />
        </div>
      </div>
    )))
  }

  _getClass() {
    const { isDragging } = this.props
    const classes = ['question']
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _getEdit() {
    const { question } = this.props
    return {
      question,
      onSubmit: this._handleUpdate
    }
  }

  _handleEdit() {
    this.context.form.push(Edit, this._getEdit.bind(this))
  }

  _handleRemove() {
  }

  _handleUpdate(question) {
    this.props.onUpdate(question)
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    delta: props.question.delta,
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

Question = DragSource('ITEM', source, sourceCollector)(Question)
Question = DropTarget('ITEM', target, targetCollector)(Question)

export default Question
