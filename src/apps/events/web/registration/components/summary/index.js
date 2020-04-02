import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Summary extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    ticket_types: PropTypes.object
  }

  render() {
    const { event, ticket_types } = this.props
    return (
      <div className="registration-summary">
        <table>
          <thead>
            <tr>
              <td>ITEM</td>
              <td>TOTAL</td>
            </tr>
          </thead>
          <tbody>
            { Object.keys(ticket_types).map((id, index) => {
              const ticket_type = _.find(event.ticket_types, { id: parseInt(id) })
              return (
                <tr key={`ticket_type_${index}`}>
                  <td>{ ticket_type.name } x { ticket_types[id] }</td>
                  <td>100.00</td>
                </tr>
              )
            })}
            <tr>
              <td className="registration-summary-total">Subtotal</td>
              <td>100.00</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>Discount (15%)</td>
              <td>-15.00</td>
            </tr>
            <tr>
              <td className="registration-summary-total">Total</td>
              <td>85.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default Summary
