import { Audit, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ appraisal }) => {

  const list = {}

  list.alert = { color: 'blue', message: 'This appraisal has been assigned' }

  list.items = [
    { label: 'Employee', content: appraisal.employee.full_name },
    { label: 'Supervisor', content: appraisal.supervisor.full_name },
    { label: 'Signatures', content: (
      <div>
        Executive Director: Ken Schlather 1/23/19<br />
        Issue Leader: Ken Schlather 1/23/19<br />
        Supervisor: Ken Schlather 1/23/19<br />
        Employee: Greg Kops 1/23/19<br />
      </div>
    ) }
  ]

  list.items.push({ component: <Audit entries={ appraisal.audit } /> })

  return <List { ...list } />

}

Details.propTypes = {
  appraisal: PropTypes.object
}

export default Details
