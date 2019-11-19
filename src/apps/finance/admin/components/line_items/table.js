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

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { overassigned, sum, total, unassigned } = this.props
    const line_items = this.props.display
    if(line_items.length === 0) return (
      <div className="ui button" onClick={ this._handleNew }>
        Add an allocation
      </div>
    )
    return (
      <div className="line-items-table">
        <table className="ui unstackable celled table">
          <thead>
            <tr>
              <th>Project</th>
              <th className="collapsing">Amnt</th>
              <th colSpan="2" className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { line_items.map((line_item, index) => [
              <tr key={`line_item_${index}`}>
                <td>
                  { line_item.project.integration.project_code } - { line_item.project.title }
                </td>
                <td className="right aligned">{ numeral(line_item.amount).format('0.00') }</td>
                { line_item.can_edit === false ?
                  <td className="line-items-action disabled">
                    <i className="fa fa-pencil" />
                  </td> :
                  <td className="line-items-action" onClick={ this._handleEdit.bind(this, index) }>
                    <i className="fa fa-pencil" />
                  </td>
                }
                { line_item.can_delete === false ?
                  <td className="line-items-action disabled">
                    <i className="fa fa-times" />
                  </td> :
                  <td className="line-items-action" onClick={ this._handleRemove.bind(this, index) }>
                    <i className="fa fa-times" />
                  </td>
                }
              </tr>
            ]) }
          </tbody>
          { line_items.length > 0 &&
            <tfoot>
              <tr>
                <th>Total</th>
                <td className="right aligned">
                  <strong>{ numeral(sum).format('0.00') }</strong>
                </td>
                <th colSpan="2" />
              </tr>
            </tfoot>
          }
        </table>
        <Button { ...this._getButton() } />
        { unassigned &&
          <div className="alert">
            { numeral(unassigned).format('0.00') } of the { numeral(total).format('0.00') }  total has not been assigned
          </div>
        }
        { overassigned &&
          <div className="alert">
            { numeral(overassigned).format('0.00') } more than the { numeral(total).format('0.00') } total has been assigned
          </div>
        }
      </div>
    )
  }

  _getButton() {
    const { line_items } = this.props
    return {
      className: 'link',
      label: line_items.length > 0 ? 'Add Another Allocation' : 'Allocate to Project',
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

  _handleRemove(index, e) {
    e.stopPropagation()
    this.props.onRemove(index)
  }

  _handleUpdate(line_item, index) {
    this.props.onUpdate(line_item, index)
  }

}

export default Table
