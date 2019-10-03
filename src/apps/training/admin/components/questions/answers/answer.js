import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

class Answer extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    answer: PropTypes.object,
    index: PropTypes.number,
    onChoose: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleChoose = this._handleChoose.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, answer } = this.props
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        <div className="answer-handle">
          <i className="fa fa-fw fa-bars" />
        </div>
        <div className="answer-label">
          { answer.is_active ?
            <input { ...this._getInput(answer) } /> :
            <span>{ answer.text }</span>
          }
        </div>
        <div className="answer-correct" onClick={ this._handleChoose }>
          { answer.is_correct ?
            <i className="fa fa-fw fa-check-circle" /> :
            <i className="fa fa-fw fa-circle-o" />
          }
        </div>
        <div className="answer-extra" onClick={ this._handleRemove }>
          { answer.is_active ?
            <i className="fa fa-fw fa-remove" /> :
            <i className="fa fa-fw fa-refresh" />
          }
        </div>
      </div>
    )))
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getClass() {
    const { answer } = this.props
    const classes = ['answer']
    if(!answer.is_active) classes.push('disabled')
    return classes.join(' ')
  }

  _getInput() {
    const { answer } = this.props
    return {
      type: 'text',
      value: answer.text,
      placeholder: 'Enter an answer',
      onChange: this._handleUpdate
    }
  }

  _handleChoose() {
    const { index } = this.props
    this.props.onChoose(index)
  }

  _handleRemove() {
    const { index } = this.props
    this.props.onRemove(index)
  }

  _handleUpdate(event) {
    const { index } = this.props
    this.props.onUpdate(index, event.target.value)
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    delta: props.answer.delta,
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

Answer = DragSource('ITEM', source, sourceCollector)(Answer)
Answer = DropTarget('ITEM', target, targetCollector)(Answer)

export default Answer
