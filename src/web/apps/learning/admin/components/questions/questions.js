import PropTypes from 'prop-types'
import Question from './question'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Questions extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    quiz: PropTypes.object,
    questions: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onMove: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { questions } = this.props
    return (
      <div className="questions">
        { questions.length === 0 &&
          <div className="questions-empty">
            There are no questions for this quiz
          </div>
        }
        { questions.map((question, index) => (
          <Question { ...this._getQuestion(question, index) } key={`question_${question.id}`} />
        ))}
        <div className="questions-footer">
          <div className="ui blue fluid button" onClick={ this._handleNew }>
            Add Question
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet, onReady } = this.props
    if(defaultValue) onSet(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props
    if(!_.isEqual(questions, prevProps.questions)) {
      this.props.onChange(questions)
    }
  }

  _getQuestion(question, index) {
    const { onMove } = this.props
    return {
      index,
      question,
      onMove
    }
  }

  _handleNew() {
    this.context.form.push(<New onSubmit={ this._handleAdd } />)
  }

  _handleAdd(question) {
    this.props.onAdd(question)
  }

}

export default Questions
