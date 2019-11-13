import PropTypes from 'prop-types'
import React from 'react'

class ACH extends React.Component {

  static propTypes = {
  }

  state = {
    selected: null
  }

  render() {
    return (
      <div className="maha-paymentfield-card">
        <div className="two fields">
          <div className="field">
            <label>Routing Number</label>
            <input type="text" placeholder="Routing Number" />
          </div>
          <div className="field">
            <label>Account Number</label>
            <input type="text" placeholder="Account Number" />
          </div>
        </div>
        <div className="field">
          <label>Type</label>
          <input type="text" />
        </div>
        <div className="two fields">
          <div className="field">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>
        </div>
        <div className="field">
          <label>Business Name</label>
          <input type="text" placeholder="Last Name" />
        </div>
      </div>
    )
  }
}

export default ACH
