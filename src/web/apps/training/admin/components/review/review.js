import { Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import Question from './question'
import ThankYou from './thankyou'
import React from 'react'

class Review extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.number,
    answers: PropTypes.object,
    endpoint: PropTypes.string,
    is_complete: PropTypes.bool,
    questions: PropTypes.array,
    status: PropTypes.string,
    onAnswer: PropTypes.func,
    onBack: PropTypes.func,
    onSave: PropTypes.func
  }

  static defaultProps = {}

  _handleAnswer = this._handleAnswer.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { is_complete, status } = this.props
    if(status === 'saving') return <Loader />
    if(status === 'saved') return <ThankYou />
    if(is_complete) return null
    return (
      <Question { ...this._getQuestion() } />
    )
  }

  componentDidUpdate(prevProps) {
    const { is_complete } = this.props
    if(is_complete !== prevProps.is_complete && is_complete) {
      this._handleSave()
    }
  }

  _getQuestion() {
    const { active, answers, questions } = this.props
    const question = questions[active]
    return {
      ...question,
      index: active,
      total: questions.length,
      answer: answers[question.name],
      key: `question_${active}`,
      onAnswer: this._handleAnswer,
      onBack: this._handleBack
    }
  }

  _handleAnswer(key, value) {
    this.props.onAnswer(key, value)
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSave() {
    const { answers, endpoint, onSave } = this.props
    onSave(endpoint, answers)
  }

}

export default Review
