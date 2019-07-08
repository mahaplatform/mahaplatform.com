import PropTypes from 'prop-types'
import Answer from './answer'
import React from 'react'

class Answers extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    correct_answer: PropTypes.number,
    expanded: PropTypes.array,
    answers: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onMove: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { answers } = this.props
    return (
      <div className="answers">
        { answers.length === 0 &&
          <div className="answers-empty">
            There are not yet any answers to this question
          </div>
        }
        { answers.map((answer, index) => (
          <Answer { ...this._getAnswer(answer, index) } key={`answer_${index}`} />
        ))}
        <div className="answers-footer">
          <div className="ui blue fluid button" onClick={ this._handleAdd }>
            Add Answer
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
    this.props.onChange([
      { text: 'One', is_correct: false },
      { text: 'Two', is_correct: true },
      { text: 'Three', is_correct: false }
    ])
  }

  _getAnswer(answer, index) {
    const { onChoose, onMove, onRemove, onUpdate } = this.props
    return {
      answer,
      index,
      onChoose,
      onMove,
      onRemove,
      onUpdate
    }
  }

  _handleAdd() {
    this.props.onAdd()
  }

}

export default Answers
