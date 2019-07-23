import Responsibilities from './responsibilities'
import { supervisor } from '../fields'
import Questions from './questions'
import PropTypes from 'prop-types'
import Ratings from './ratings'
import React from 'react'

const Supervisor = ({ appraisal }) => (
  <div className="appraisal">
    <Questions title="Position Description Review" questions={ supervisor } section="position" appraisal={ appraisal } />
    <Responsibilities appraisal={ appraisal } />
    <Ratings title="General Expectations" questions={ supervisor } section="general" appraisal={ appraisal } />
    <Ratings title="Skills for Success" questions={ supervisor } section="success" appraisal={ appraisal } />
    <Ratings title="Supervisory Skills" questions={ supervisor } section="supervisory" appraisal={ appraisal } />
  </div>
)

Supervisor.propTypes = {
  appraisal: PropTypes.object
}


export default Supervisor
