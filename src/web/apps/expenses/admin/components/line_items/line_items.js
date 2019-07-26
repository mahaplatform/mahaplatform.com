import PropTypes from 'prop-types'
import Inline from './inline'
import Table from './table'
import React from 'react'
import _ from 'lodash'

class LineItems extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    display: PropTypes.array,
    expense_types: PropTypes.object,
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
    const { line_items, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="line-items">
        { line_items.length <= 1 ?
          <Inline { ...this.props } /> :
          <Table { ...this.props } />
        }
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
