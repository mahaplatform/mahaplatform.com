import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import Edit from './edit'
import React from 'react'
import New from './new'

class Table extends React.PureComponent {

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
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { total } = this.props
    const line_items = this.props.display
    return (
      <div className="line-items-table">
        <div className="field">
          <table className="ui unstackable compact table">
            <thead>
              <tr>
                <th>Project</th>
                <th className="collapsing">Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              { line_items.length === 0 &&
                <tr>
                  <td colSpan="3">There are no line_items</td>
                </tr>
              }
              { line_items.map((line_item, index) => [
                <tr key={`line_item_${index}`}>
                  <td>
                    { line_item.project.integration.project_code } - { line_item.project.title }
                  </td>
                  <td className="right aligned">{ numeral(line_item.amount).format('0.00') }</td>
                  <td className="line-items-actions">
                    <div className="line-items-action" onClick={ this._handleEdit.bind(this, index) }>
                      <i className="fa fa-fw fa-pencil" />
                    </div>
                    <div className="line-items-action" onClick={ this._handleRemove.bind(this, index) }>
                      <i className="fa fa-fw fa-times" />
                    </div>
                  </td>
                </tr>
              ]) }
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <td className="right aligned">
                  <strong>{ numeral(total).format('0.00') }</strong>
                </td>
                <th />
              </tr>
            </tfoot>
          </table>
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  _getButton() {
    return {
      label: 'Add Another Line Item',
      color: 'blue',
      handler: this._handleNew
    }
  }

  _getEdit(line_item, index) {
    const { projectEndpoint } = this.props
    return {
      projectEndpoint,
      line_item,
      index,
      onSubmit: this._handleUpdate
    }
  }

  _getNew() {
    const { projectEndpoint } = this.props
    return {
      projectEndpoint,
      onSubmit: this._handleAdd
    }
  }

  _handleAdd(line_item) {
    this.props.onAdd(line_item)
  }

  _handleEdit(index) {
    const { line_items } = this.props
    this.context.form.push(<Edit { ...this._getEdit(line_items[index], index) }  />)
  }

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() }  />)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleUpdate(line_item, index) {
    this.props.onUpdate(line_item, index)
  }

}

export default Table
