import { employee } from '../fields'
import Position from './position'
import Questions from './questions'
import PropTypes from 'prop-types'
import React from 'react'

const Employee = ({ appraisal }) => (
  <div className="appraisal">
    <Position name="employee_position_description" questions={ employee } appraisal={ appraisal } />
    <Questions title="Self Review" section="self" questions={ employee } appraisal={ appraisal } />
  </div>
)

Employee.propTypes = {
  appraisal: PropTypes.object
}

export default Employee
