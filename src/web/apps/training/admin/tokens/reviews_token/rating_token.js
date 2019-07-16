import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class RatingToken extends React.Component {

  static propTypes = {
    answers: PropTypes.array,
    question: PropTypes.string,
    total: PropTypes.number
  }

  chart = null

  render() {
    const { answers, question, total } = this.props
    return (
      <div className="review-question-token">
        <div className="review-question-token-question">
          { question }
        </div>
        <div className="review-question-token-table">
          <table className="ui celled unstackable compact table">
            <thead>
              <tr>
                <th className="collapsing">#</th>
                <th>Answer</th>
                <th className="collapsing">%</th>
                <th className="collapsing">Count</th>
              </tr>
            </thead>
            <tbody>
              { answers.map((answer, index) => (
                <tr key={`answer_${index}`} className={ this._getClass(answer, answers) }>
                  <td>{ answer.value }</td>
                  <td>{ answer.text }</td>
                  <td className="right aligned">{ numeral(answer.count / total).format('0.00%') }</td>
                  <td className="right aligned">{ answer.count }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getClass(answer, answers) {
    const classes = []
    const highest = answers.reduce((highest, answer) => {
      return answer.count > highest ? answer.count : highest
    }, 0)
    const winner = answers.filter(a => a.count === highest).find(a => a.value === answer.value)
    if(winner !== undefined && highest > 0) classes.push('winner')
    return classes.join(' ')
  }

}

export default RatingToken
