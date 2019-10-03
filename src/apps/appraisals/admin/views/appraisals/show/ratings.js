import PropTypes from 'prop-types'
import React from 'react'

const Ratings = ({ appraisal, questions, section, title }) => (
  <table className="ui celled unstackable compact table">
    <thead>
      <tr>
        <th colSpan="2">{ title }</th>
      </tr>
    </thead>
    <tbody>
      { questions.filter(rating => rating.section === section).map((rating, index) => [
        <tr key={`field_${index}`}>
          <td>
            <div className="appraisal-rating-description">
              <strong>{ rating.label }</strong><br />
              { rating.instructions }
            </div>
            { appraisal[`${rating.name}_rating`] !== null ?
              <div className="appraisal-rating-comments">
                { appraisal[`${rating.name}_rating`] === 1 && <strong>Exceeds Expectations</strong> }
                { appraisal[`${rating.name}_rating`] === 2 && <strong>Meets Expectations</strong> }
                { appraisal[`${rating.name}_rating`] === 3 && <strong>Does Not Meet Expectations</strong> }
                { appraisal[`${rating.name}_rating`] === 0 && <strong>Not Applicable</strong> }
                { appraisal[`${rating.name}_comments`] &&
                  <span> - { appraisal[`${rating.name}_comments`] }</span>
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

Ratings.propTypes = {
  appraisal: PropTypes.object,
  questions: PropTypes.array,
  section: PropTypes.string,
  title: PropTypes.string
}

export default Ratings
