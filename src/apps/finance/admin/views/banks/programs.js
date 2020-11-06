import ProgramToken from '@apps/crm/admin/tokens/program'
import { Assignment } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Employees extends React.Component {

  static propTypes = {
    bank: PropTypes.object
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { bank } = this.props
    console.log(this.props)
    return {
      action: `/api/admin/finance/banks/${bank.id}/programs`,
      assignedEndpoint: `/api/admin/finance/banks/${bank.id}/programs`,
      assignedFormat: ({ program }) => <ProgramToken { ...program } />,
      empty: {
        icon: 'programs',
        title: 'Add programs',
        text: 'Please assign programs to this bank'
      },
      label: 'Program',
      name: 'program',
      text: 'title',
      title: 'Manage Programs',
      unassignedEndpoint: '/api/admin/crm/programs',
      unassignedFormat: (program) => <ProgramToken { ...program } />,
      value: 'id'
    }
  }

}

export default Employees
