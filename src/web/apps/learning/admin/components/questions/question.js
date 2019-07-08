import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

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
        <div className="question-extra">
          <i className="fa fa-fw fa-pencil" />
        </div>
        <div className="question-extra">
          <i className="fa fa-fw fa-times" />
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
