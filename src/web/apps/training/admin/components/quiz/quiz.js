import { Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import Question from './question'
import Results from './results'
import React from 'react'

class Quiz extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    answering: PropTypes.object,
    correct: PropTypes.number,
    id: PropTypes.number,
    index: PropTypes.number,
    question: PropTypes.object,
    quiz: PropTypes.object,
    status: PropTypes.string,
    onAnswer: PropTypes.func,
    onFetch: PropTypes.func,
    onNext: PropTypes.func,
    onQuestion: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { quiz, question } = this.props
    if(!quiz) return <Loader />
    if(question) return <Question { ...this._getQuestion() } />
    if(quiz.is_complete) return <Results { ...this._getResults() } />
    return null
  }

  componentDidMount() {
    const { id, onFetch } = this.props
    onFetch(id)
  }

  componentDidUpdate(prevProps) {
    const { answering, quiz, onQuestion } = this.props
    if(quiz && quiz.is_complete) return
    if(quiz !== prevProps.quiz && !prevProps.quiz) {
      onQuestion(quiz.id)
    }
    if(answering !== prevProps.answering && !answering) {
      onQuestion(quiz.id)
    }
  }

  _getQuestion() {
    const { answering, correct, question, quiz, onAnswer, onNext } = this.props
    return {
      answering,
      correct,
      question,
      quiz,
      onAnswer,
      onNext
    }
  }

  _getResults() {
    const { quiz } = this.props
    return {
      quiz
    }
  }

}

export default Quiz
