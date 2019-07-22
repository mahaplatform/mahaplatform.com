import PropTypes from 'prop-types'
import React from 'react'

class FeedbackToken extends React.Component {

  static propTypes = {
    answers: PropTypes.array,
    question: PropTypes.string,
    total: PropTypes.number
  }

  chart = null

  render() {
    const { answers, question } = this.props
    return (
      <div className="review-question-token">
        <div className="review-question-token-question">
          { question }
        </div>
        <div className="review-question-token-table">
          <table className="ui celled unstackable compact table">
            <thead>
              <tr>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              { answers.map((answer, index) => (
                <tr key={`answer_${index}`}>
                  <td>{ answer }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default FeedbackToken
