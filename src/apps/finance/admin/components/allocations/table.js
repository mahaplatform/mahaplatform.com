import { Button } from '@admin'
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

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { overassigned, sum, total, unassigned } = this.props
    const allocations = this.props.display
    if(allocations.length === 0) return (
      <div className="ui button" onClick={ this._handleNew }>
        Add an allocation
      </div>
    )
    return (
      <div className="allocations-table">
        <table className="ui unstackable celled table">
          <thead>
            <tr>
              <th>Project</th>
              <th className="collapsing">Amnt</th>
              <th colSpan="2" className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { allocations.map((allocation, index) => [
              <tr key={`allocation_${index}`}>
                <td>
                  { allocation.project.integration.project_code } - { allocation.project.title }
                </td>
                <td className="right aligned">{ numeral(allocation.amount).format('0.00') }</td>
                { allocation.can_edit === false ?
                  <td className="allocations-action disabled">
                    <i className="fa fa-pencil" />
                  </td> :
                  <td className="allocations-action" onClick={ this._handleEdit.bind(this, index) }>
                    <i className="fa fa-pencil" />
                  </td>
                }
                { allocation.can_delete === false ?
                  <td className="allocations-action disabled">
                    <i className="fa fa-times" />
                  </td> :
                  <td className="allocations-action" onClick={ this._handleRemove.bind(this, index) }>
                    <i className="fa fa-times" />
                  </td>
                }
              </tr>
            ]) }
          </tbody>
          { allocations.length > 0 &&
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
    const { allocations } = this.props
    return {
      className: 'link',
      label: allocations.length > 0 ? 'Add Another Allocation' : 'Allocate to Project',
      handler: this._handleNew
    }
  }

  _getEdit(allocation, index) {
    const { projectEndpoint } = this.props
    return {
      projectEndpoint,
      allocation,
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

  _handleAdd(allocation) {
    this.props.onAdd(allocation)
  }

  _handleEdit(index) {
    const { allocations } = this.props
    this.context.form.push(Edit, this._getEdit.bind(this, allocations[index], index))
  }

  _handleNew() {
    this.context.form.push(New, this._getNew.bind(this))
  }

  _handleRemove(index, e) {
    e.stopPropagation()
    this.props.onRemove(index)
  }

  _handleUpdate(allocation, index) {
    this.props.onUpdate(allocation, index)
  }

}

export default Table
