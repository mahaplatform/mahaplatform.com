import PropTypes from 'prop-types'
import React from 'react'

class Answer extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    correct_answer: PropTypes.number,
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    answer: PropTypes.object,
    index: PropTypes.integer,
    onChoose: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { answer, correct_answer, index } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="answer-correct" onClick={ this._handleChoose.bind(this, index) }>
          { index === correct_answer ?
            <i className="fa fa-fw fa-check-circle" /> :
            <i className="fa fa-fw fa-circle-o" />
          }
        </div>
        <div className="answer-label">
          <input type="text" defaultValue={ answer.text } placeholder="Enter an answer" />
        </div>
        <div className="answer-extra" onClick={ this._handleRemove.bind(this, index) }>
          <i className="fa fa-fw fa-remove" />
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getClass() {
    const { isDragging } = this.props
    const classes = ['answer']
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _getAnswerClass(answer, index) {
    const classes = ['answer-answer']
    if(index === answer.correct_answer) classes.push('correct')
    return classes.join(' ')
  }

  _handleChoose(index) {
    this.props.onChoose(index)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Answer
