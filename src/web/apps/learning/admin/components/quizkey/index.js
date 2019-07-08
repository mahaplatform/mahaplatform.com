import PropTypes from 'prop-types'
import React from 'react'

const QuizKey = ({ quiz }) => (
  <div className="quizkey-questions">
    { quiz.questions.map((question, index) => (
      <div className="quizkey-question" key={`question_${index}`}>
        <span className="quizkey-question-text">
          { question.text }
        </span>
        <div className="quizkey-answers">
          { question.answers.map((answer, index2) => (
            <div className={`quizkey-answer ${answer.is_correct ? 'correct' : ''}`} key={`answer_${index2}`}>
              { answer.text }
            </div>
          )) }
        </div>
        <div className="quizkey-explanation">
          <em>{ question.explanation }</em>
        </div>
      </div>
    )) }
  </div>
)

QuizKey.propTypes = {
  quiz: PropTypes.object
}

export default QuizKey
