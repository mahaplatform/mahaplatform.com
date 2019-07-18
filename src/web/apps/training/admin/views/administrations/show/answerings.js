import { CompactUserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Answerings extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    questions: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { questions } = this.props
    return (
      <div className="administrations">
        { questions.map((question, index) => (
          <div className="review-question-token" key={`answering_${index}`}>
            <div className="review-question-token-question">
              { question.text }
            </div>
            <div className="review-question-token-table">
              <table className="ui celled unstackable compact table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th className="collapsing">Answer</th>
                    <th className="collapsing">Correct</th>
                  </tr>
                </thead>
                <tbody>
                  { question.answerings.length === 0 &&
                    <tr>
                      <td colSpan="3" className="center aligned">There are no employees registered for this offering yet</td>
                    </tr>
                  }
                  { question.answerings.map((answering, index2) => (
                    <tr key={`answering_${index2}`}>
                      <td className="user-cell"><CompactUserToken { ...answering.user } /></td>
                      <td className="center aligned">
                        { answering.answer !== null &&
                          <span>{ (answering.answer + 10).toString(36).toUpperCase() }</span>
                        }
                      </td>
                      <td className="center aligned">
                        { answering.is_correct !== null &&
                          <span>{ answering.is_correct ?
                            <i className="fa fa-check" /> :
                            <i className="fa fa-times" /> }
                          </span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )) }
      </div>
    )
  }

}

export default Answerings
