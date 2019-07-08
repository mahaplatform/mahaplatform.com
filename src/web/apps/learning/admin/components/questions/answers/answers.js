import PropTypes from 'prop-types'
import Answer from './answer'
import React from 'react'
import _ from 'lodash'

class Answers extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    expanded: PropTypes.array,
    answers: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onMove: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
    onSet: PropTypes.func,
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
    const { defaultValue } = this.props
    if(defaultValue) return this._handleSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { answers } = this.props
    if(!_.isEqual(answers, prevProps.answers)) {
      this.props.onChange(answers)
    }
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

  _handleSet(answers) {
    this.props.onSet(answers)
    this.props.onReady()
  }

}

export default Answers
