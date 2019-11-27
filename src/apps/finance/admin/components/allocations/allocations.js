import PropTypes from 'prop-types'
import Table from './table'
import React from 'react'
import _ from 'lodash'

class Allocations extends React.PureComponent {

  static propTypes = {
    allocations: PropTypes.array,
    defaultValue: PropTypes.array,
    display: PropTypes.array,
    expense_types: PropTypes.object,
    overassigned: PropTypes.number,
    projects: PropTypes.object,
    projectEndpoint: PropTypes.string,
    status: PropTypes.string,
    sum: PropTypes.number,
    tax_total: PropTypes.number,
    total: PropTypes.number,
    unassigned: PropTypes.number,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onFetchExpenseTypes: PropTypes.func,
    onFetchProjects: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    projectEndpoint: '/api/admin/finance/memberships'
  }

  render() {
    const { status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="allocations">
        <Table { ...this.props } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, projectEndpoint } = this.props
    this.props.onFetchExpenseTypes()
    this.props.onFetchProjects(projectEndpoint)
    if(defaultValue) this.props.onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { allocations, status } = this.props
    if(status !== prevProps.status && status === 'ready') {
      this.props.onReady()
    }
    if(!_.isEqual(allocations, prevProps.allocations)) {
      this._handleChange()
    }
  }

  _handleChange() {
    const { allocations, tax_total, total } = this.props
    this.props.onChange(allocations.map((allocation, index) => {
      const round = index === 0 ? _.ceil : _.floor
      return {
        ...allocation,
        delta: index,
        tax: tax_total ? round(tax_total * (allocation.amount / total), 2) : 0.00
      }
    }))
  }

}

export default Allocations
