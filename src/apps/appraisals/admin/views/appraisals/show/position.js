import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Position = ({ appraisal, name, questions }) => {
  const question = _.find(questions, { name })
  return (
    <table className="ui celled unstackable compact table">
      <thead>
        <tr>
          <th colSpan="2">Position Description Review</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="appraisal-rating-description">
              <strong>{ question.label }</strong><br />
              { question.instructions }
            </div>
            { appraisal[`${name}_updated`] !== null ?
              <div className="appraisal-rating-comments">
                { appraisal[`${name}_updated`] ?
                  <strong>Yes</strong> :
                  <strong>No</strong>
                }
                { appraisal[`${name}_updated`] === false && appraisal[`${name}_comments`] &&
                  <span> - { appraisal[`${name}_comments`] }</span>
                }
              </div> :
              <div className="appraisal-rating-unaswered">
                This question has not yet been answered
              </div>
            }

          </td>
        </tr>
      </tbody>
    </table>
  )
}

Position.propTypes = {
  appraisal: PropTypes.object,
  questions: PropTypes.array,
  name: PropTypes.string
}

export default Position
