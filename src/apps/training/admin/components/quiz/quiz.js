import { Loader, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import Question from './question'
import React from 'react'

class Quiz extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

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

  _handleDone = this._handleDone.bind(this)

  render() {
    const { quiz, question } = this.props
    if(!quiz) return <Loader />
    if(question) return <Question { ...this._getQuestion() } />
    if(quiz.is_complete) return <Message { ...this._getSummary() } />
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

  _getSummary() {
    const { quiz } = this.props
    return {
      backgroundColor: quiz.was_passed ? 'green' : 'red',
      title: quiz.was_passed ? 'You Passed' : 'You Did Not Pass',
      text: `You answered ${ quiz.correct_count } / ${ quiz.total_count } questions correctly`,
      icon: quiz.was_passed ? 'star' : 'ban',
      button: {
        label: 'Close Quiz',
        handler: this._handleDone
      }
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Quiz
