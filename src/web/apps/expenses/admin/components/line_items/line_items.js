import PropTypes from 'prop-types'
import Table from './table'
import React from 'react'
import _ from 'lodash'

class LineItems extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    display: PropTypes.array,
    expense_types: PropTypes.object,
    item_id: PropTypes.number,
    line_items: PropTypes.array,
    projects: PropTypes.object,
    projectEndpoint: PropTypes.string,
    status: PropTypes.string,
    total: PropTypes.number,
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
      this.props.onChange(line_items)
    }
  }

}

export default LineItems
