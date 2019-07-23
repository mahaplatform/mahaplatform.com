import PropTypes from 'prop-types'
import React from 'react'

const Questions = ({ appraisal, questions, section, title }) => (
  <table className="ui celled unstackable compact table">
    <thead>
      <tr>
        <th>{ title }</th>
      </tr>
    </thead>
    <tbody>
      { questions.filter(rating => rating.section === section).map((question, index) => [
        <tr key={`field_${index}`}>
          <td>
            <strong>{ question.label }</strong><br />
            { question.instructions }
            { appraisal[question.name] !== null ?
              <div className="appraisal-rating-comments">
                { appraisal[question.name] }
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

Questions.propTypes = {
  appraisal: PropTypes.object,
  questions: PropTypes.array,
  section: PropTypes.string,
  title: PropTypes.string
}

export default Questions
