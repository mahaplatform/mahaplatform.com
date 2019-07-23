import { employee } from '../fields'
import Questions from './questions'
import PropTypes from 'prop-types'
import React from 'react'

const Employee = ({ appraisal }) => (
  <div className="appraisal">
    <Questions title="Position Description Review" questions={ employee } section="position" appraisal={ appraisal } />
    <Questions title="Self Review" section="self" questions={ employee } appraisal={ appraisal } />
  </div>
)

Employee.propTypes = {
  appraisal: PropTypes.object
}

export default Employee
