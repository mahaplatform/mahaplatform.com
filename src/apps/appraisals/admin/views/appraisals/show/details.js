import { Audit, List } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const Details = ({ appraisal }) => {

  const list = {}

  list.alert = { color: 'blue', message: 'This appraisal has been assigned' }

  list.items = [
    { label: 'Employee', content: appraisal.employee.full_name },
    { label: 'Supervisor', content: appraisal.supervisor.full_name },
    { label: 'Signatures', content: (
      <div>
        { appraisal.executive_director_signature &&
          <div>
            Executive Director: { appraisal.executive_director_signature } ({ moment(appraisal.executive_director_signed_at).format('MM/DD/YYYY') })
          </div>
        }
        { appraisal.issue_leader_signature &&
          <div>
            Issue Leader: { appraisal.issue_leader_signature } ({ moment(appraisal.issue_leader_signed_at).format('MM/DD/YYYY') })
          </div>
        }
        { appraisal.supervisor_signature &&
          <div>
            Supervisor: { appraisal.supervisor_signature } ({ moment(appraisal.supervisor_signed_at).format('MM/DD/YYYY') })
          </div>
        }
        { appraisal.employee_signature &&
          <div>
            Employee: { appraisal.employee_signature } ({ moment(appraisal.employee_signed_at).format('MM/DD/YYYY') })
          </div>
        }
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
