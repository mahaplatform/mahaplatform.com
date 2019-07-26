import { Button, Lookup, MoneyField, TextField } from 'maha-admin'
import ExpenseTypeToken from '../../tokens/expense_type'
import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Inline extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

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

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    return (
      <div className="line-items-inline">
        <div className="field">
          <label>Project</label>
          <Lookup { ...this._getProject() } />
        </div>
        <div className="field">
          <label>Expense Type</label>
          <Lookup { ...this._getExpenseType() } />
        </div>
        <div className="field">
          <label>Description</label>
          <TextField { ...this._getDescription() } />
        </div>
        <div className="field">
          <label>Amount</label>
          <MoneyField { ...this._getAmount() } />
        </div>
        <Button { ...this._getButton() }/>
      </div>
    )
  }

  componentDidMount() {
    const { line_items } = this.props
    if(line_items.length > 0) return
    this.props.onAdd({
      id: null,
      project_id: null,
      expense_type_id: null,
      description: null,
      amount: null
    })
  }

  _getAmount() {
    const { line_items } = this.props
    return {
      placeholder: 'Enter the amount',
      defaultValue: line_items[0] ? line_items[0].amount : null,
      onChange: this._handleUpdate.bind(this, 'amount')
    }
  }

  _getButton() {
    return {
      label: 'Split this expense',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getDescription() {
    const { line_items } = this.props
    return {
      placeholder: 'Describe the line item',
      defaultValue: line_items[0] ? line_items[0].description : null,
      onChange: this._handleUpdate.bind(this, 'description')
    }
  }

  _getExpenseType() {
    const { line_items } = this.props
    return {
      placeholder: 'Choose an expense type',
      endpoint: '/api/admin/expenses/expense_types/active',
      value: 'id',
      text: 'title',
      format: ExpenseTypeToken,
      defaultValue: line_items[0] ? line_items[0].expense_type_id : null,
      onChange: this._handleUpdate.bind(this, 'expense_type_id')
    }
  }

  _getNew() {
    const { projectEndpoint } = this.props
    return {
      projectEndpoint,
      onSubmit: this._handleAdd
    }
  }

  _getProject() {
    const { line_items, projectEndpoint } = this.props
    return {
      placeholder: 'Choose a project',
      endpoint: projectEndpoint,
      value: 'id',
      text: 'title',
      format: ProjectToken,
      defaultValue: line_items[0] ? line_items[0].project_id : null,
      onChange: this._handleUpdate.bind(this, 'project_id')
    }
  }

  _handleAdd(line_item) {
    this.props.onAdd(line_item)
  }

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() }  />)
  }

  _handleUpdate(key, value) {
    const { line_items } = this.props
    const line_item = {
      ...line_items[0],
      [key]: value
    }
    this.props.onUpdate(line_item, 0)
  }

}

export default Inline
