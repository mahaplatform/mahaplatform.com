import PropTypes from 'prop-types'
import Table from './table'
import React from 'react'
import _ from 'lodash'

class LineItems extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    display: PropTypes.array,
    expense_types: PropTypes.object,
    line_items: PropTypes.array,
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
    projectEndpoint: '/api/admin/expenses/memberships'
  }

  render() {
    const { status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="line-items">
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
    const { line_items, status } = this.props
    if(status !== prevProps.status && status === 'ready') {
      this.props.onReady()
    }
    if(!_.isEqual(line_items, prevProps.line_items)) {
      this._handleChange()
    }
  }

  _handleChange() {
    const { line_items, tax_total, total } = this.props
    this.props.onChange(line_items.map((line_item, index) => {
      const round = index === 0 ? _.ceil : _.floor
      return {
        ...line_item,
        delta: index,
        tax: tax_total ? round(tax_total * (line_item.amount / total), 2) : 0.00
      }
    }))
  }

}

export default LineItems
