import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

class Question extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    index: PropTypes.number,
    isDragging: PropTypes.bool,
    question: PropTypes.object,
    quiz: PropTypes.object
  }

  static defaultProps = {}

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, question } = this.props
    return connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        { connectDragSource(
          <div className="question-handle">
            <i className="fa fa-fw fa-bars" />
          </div>
        ) }
        <div className="question-label">
          { question.text }
        </div>
        <div className="question-extra" onClick={ this._handleTasks }>
          <i className="fa fa-fw fa-ellipsis-v" />
        </div>
      </div>
    ))
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getClass() {
    const { isDragging } = this.props
    const classes = ['question']
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _handleTasks() {
    const { question, quiz } = this.props
    this.context.tasks.open([
      {
        label: 'Edit Question',
        modal: () => <Edit quiz={ quiz } question={ question } />
      }, {
        label: 'Remove Question',
        request: {
          method: 'DELETE',
          endpoint: `/api/admin/learning/quizes/${quiz.id}/questions/${question.id}`,
          onFailure: (result) => this.context.flash.set('error', 'Unable to remove this question')
        }
      }
    ])
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    delta: props.question.delta,
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
    delta: props.question.delta
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

Question = DragSource('ITEM', source, sourceCollector)(Question)
Question = DropTarget('ITEM', target, targetCollector)(Question)

export default Question
