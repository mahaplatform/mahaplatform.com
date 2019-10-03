import PropTypes from 'prop-types'
import React from 'react'

const Responsibilities = ({ appraisal }) => (
  <table className="ui celled unstackable compact table">
    <thead>
      <tr>
        <th colSpan="2">Job Responsibilities</th>
      </tr>
    </thead>
    <tbody>
      { appraisal.responsibilities.length === 0 &&
        <tr>
          <td colSpan="2">
            <div className="appraisal-rating-unaswered">
              There are not yet any responsibilities for this appraisal
            </div>
          </td>
        </tr>
      }
      { appraisal.responsibilities.map((responsibility, index) => [
        <tr key={`field_${index}`}>
          <td>
            <div className="appraisal-rating-description">
              <strong>{ responsibility.responsibility_type }</strong>
            </div>
            { responsibility.rating !== null ?
              <div className={`appraisal-rating-comments result-${responsibility.rating}`}>
                { responsibility.rating === 1 && <strong>Exceeds Expectations</strong> }
                { responsibility.rating === 2 && <strong>Meets Expectations</strong> }
                { responsibility.rating === 3 && <strong>Does Not Meet Expectations</strong> }
                { responsibility.comments &&
                  <span> - { responsibility.comments }</span>
                }
              </div> :
              <div className="appraisal-rating-unaswered">
                This question has not yet been answered
              </div>
            }
          </td>
        </tr>
      ]) }
    </tbody>
  </table>
)

Responsibilities.propTypes = {
  appraisal: PropTypes.object
}

export default Responsibilities
