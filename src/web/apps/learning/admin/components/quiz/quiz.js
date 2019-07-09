import { Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import Question from './question'
import React from 'react'

class Quiz extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    answering: PropTypes.object,
    id: PropTypes.number,
    index: PropTypes.number,
    question: PropTypes.object,
    quiz: PropTypes.object,
    status: PropTypes.string,
    onFetch: PropTypes.func,
    onQuestion: PropTypes.func,
    onAnswer: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { question } = this.props
    if(!question) return <Loader />
    return (
      <div className="quiz">
        <Question { ...this._getQuestion() } />
      </div>
    )
  }

  componentDidMount() {
    const { id, onFetch } = this.props
    onFetch(id)
  }

  componentDidUpdate(prevProps) {
    const { quiz, onQuestion } = this.props
    if(quiz !== prevProps.quiz && !prevProps.quiz) {
      onQuestion(quiz.id)
    }
  }

  _getQuestion() {
    const { answering, question, quiz, onAnswer } = this.props
    return {
      answering,
      question,
      quiz,
      onAnswer
    }
  }


}

export default Quiz
