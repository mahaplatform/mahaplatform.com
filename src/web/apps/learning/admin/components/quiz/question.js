import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'

class Question extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    answering: PropTypes.object,
    correct: PropTypes.string,
    quiz: PropTypes.object,
    question: PropTypes.object,
    onAnswer: PropTypes.func,
    onNext: PropTypes.func
  }

  static defaultProps = {}

  _handleNext = this._handleNext.bind(this)

  render() {
    const { answering, correct, question, quiz } = this.props
    return (
      <div className="quiz-question blue">
        <div className="quiz-question-inner">
          <div className="quiz-question-text">
            { question.text }
          </div>
          <div className="quiz-question-answers">
            { question.answers.map((answer, index) => (
              <div className="quiz-question-answer" key={`answer_${index}`} onClick={ this._handleAnswer.bind(this, answer.id)}>
                <div className="quiz-question-answer-label">
                  { answer.text }
                </div>
                { answering &&
                  <div className="quiz-question-answer-response">
                    { answering.is_correct && answer.id === answering.answer_id &&
                      <i className="fa fa-check" />
                    }
                    { !answering.is_correct && answer.id === answering.answer_id &&
                      <i className="fa fa-times" />
                    }
                  </div>
                }
              </div>
            )) }
          </div>
        </div>
        <CSSTransition in={ answering !== null } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="quiz-question-footer">
            { answering &&
              <div className="quiz-question-explanation">
                <strong>The correct answer is { correct }!</strong><br />
                { answering.explanation }
              </div>
            }
            <button className="ui fluid green large button" onClick={ this._handleNext }>
              { quiz.is_complete ?
                <span>View Results</span> :
                <span>Next Question <i className="fa fa-chevron-right" /></span>
              }
            </button>
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _handleAnswer(id) {
    const { answering, quiz } = this.props
    if(answering) return
    this.props.onAnswer(quiz.id, id)
  }

  _handleNext() {
    this.props.onNext()
  }

}

export default Question
