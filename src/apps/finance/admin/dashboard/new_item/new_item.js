import ReimbursementNew from '../../views/reimbursements/new'
import ItemTask from '../../views/items/item_task'
import ExpenseNew from '../../views/expenses/new'
import AdvanceNew from '../../views/advances/new'
import TripImport from '../../views/items/import'
import CheckNew from '../../views/checks/new'
import TripNew from '../../views/trips/new'
import PropTypes from 'prop-types'
import React from 'react'

class NewItem extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { controls } = this.props
    const tasks = [
      { component: ItemTask('expense', 'Expense', 'I made a purchase with a work credit card or store account'), modal: ExpenseNew },
      { component: ItemTask('reimbursement', 'Reimbursement', 'I made a purchase with my own money'), modal: ReimbursementNew },
      { component: ItemTask('check', 'Check Request', 'I need a check sent to a vendor'), modal: CheckNew },
      { component: ItemTask('trip', 'Mileage', 'I need to be reimbursed for mileage'), modal: TripNew },
      { component: ItemTask('import', 'Bulk Mileage Import', 'I need to be reimbursed for many trips'), modal: TripImport },
      { component: ItemTask('advance', 'Cash Advance', 'I need a check or cash in advance'), modal: AdvanceNew }
    ]

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>New Expense</h2>
            <h3>Submit a new expense</h3>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body scrollable">
          { tasks && tasks.map((item, index) => (
            <div className="maha-tasks-list-item" key={`task_${index}`} onClick={ () => { this._handleClick(item.modal) } }>
              { item.component }
            </div>
          )) }
        </div>
      </div>
    )
  }

  _handleClick(modal) {
    this.context.modal.open(modal)
  }

}

export default NewItem
