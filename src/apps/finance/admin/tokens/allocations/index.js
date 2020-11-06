import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import PropTypes from 'prop-types'
import { List } from '@admin'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Allocations extends React.Component {

  static propTypes = {
    item: PropTypes.object,
    allocations: PropTypes.array
  }

  state = {
    expanded: []
  }

  render() {
    const { expanded } = this.state
    const { allocations, item } = this.props
    const sums = allocations.reduce((sums, allocation) => ({
      amount: sums.amount + Number(allocation.amount),
      tax: sums.tax + Number(allocation.tax)
    }), { amount: 0.00, tax: 0.00 })
    const total = Math.ceil(item.total * 100) / 100
    const amount = Math.ceil(sums.amount * 100) / 100
    const unassigned = total > amount ? total - amount : null
    const overassigned = amount > total ? amount - total : null
    return (
      <div className="allocations-token">
        <table className="ui celled compact unstackable table">
          <thead>
            <tr>
              <th>Project</th>
              <th className="collapsing">Amnt</th>
              { item.tax_total &&
                <th className="collapsing">Tax</th>
              }
            </tr>
          </thead>
          <tbody>
            { allocations.length === 0 &&
              <tr>
                <td colSpan="2">There are no line items for this item</td>
              </tr>
            }
            { allocations.map((allocation, index) => [
              <tr key={`allocation_${index}`} className={ this._getClass(allocation) } onClick={ this._handleToggle.bind(this, index) }>
                <td>
                  <i className={ `fa fa-fw fa-caret-${_.includes(expanded, index) ? 'down' : 'right' }`} />
                  { allocation.project.integration.project_code } - { allocation.project.title }
                </td>
                <td className="right aligned">{ numeral(allocation.amount).format('0.00') }</td>
                { item.tax_total &&
                  <td className="right aligned">{ numeral(allocation.tax).format('0.00') }</td>
                }
              </tr>,
              ..._.includes(expanded, index) ? [(
                <tr className="expanded" key={`allocation_expanded_${index}`}>
                  <td colSpan="3">
                    <List items={ this._getItems(allocation) } />
                  </td>
                </tr>
              )] : []
            ]) }
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <td className="right aligned">
                <strong>{ numeral(sums.amount).format('0.00') }</strong>
              </td>
              { item.tax_total &&
                <td className="right aligned">
                  <strong>{ numeral(sums.tax).format('0.00') }</strong>
                </td>
              }
            </tr>
          </tfoot>
        </table>
        { unassigned &&
          <div className="alert">
            { numeral(unassigned).format('0.00') } of the { numeral(sums.amount).format('0.00') } total has not been assigned
          </div>
        }
        { overassigned &&
          <div className="alert">
            { numeral(overassigned).format('0.00') } more than the { numeral(sums.amount).format('0.00') } total has been assigned
          </div>
        }
      </div>
    )
  }

  _getClass(allocation) {
    const { item } = this.props
    const classes = []
    if(allocation.id === item.id) classes.push('selected')
    return classes.join(' ')
  }

  _getItems(allocation) {
    const { item } = this.props
    return [
      { label: 'Project', content: allocation, format: CompactProjectToken },
      { label: 'Expense Type', content: allocation, format: CompactExpenseTypeToken },
      { label: 'Description', content: allocation.description },
      { label: 'Amount', content: numeral(allocation.amount).format('0.00') },
      ...item.tax_total ? [{ label: 'Tax', content: numeral(allocation.tax).format('0.00') }] : []
    ]
  }

  _handleToggle(index) {
    const expanded = _.xor(this.state.expanded, [index])
    this.setState({ expanded })
  }

}

export default Allocations
