import Responsibilities from './responsibilities'
import { supervisor } from '../fields'
import PropTypes from 'prop-types'
import Position from './position'
import Ratings from './ratings'
import React from 'react'

const Supervisor = ({ appraisal }) => (
  <div className="appraisal">
    <Position name="supervisor_position_description" questions={ supervisor } appraisal={ appraisal } />
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
