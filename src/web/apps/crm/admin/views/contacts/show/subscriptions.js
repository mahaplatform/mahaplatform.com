import PropTypes from 'prop-types'
import React from 'react'

const Subscriptions = () => (
  <div className="crm-subscriptions">
    mochini@gmail.com
    <table className="ui celled compact table">
      <thead>
        <tr>
          <th>List</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2">Primitive Pursuits</td>
        </tr>
        <tr>
          <td>List 1</td>
          <td>subscribed</td>
        </tr>
        <tr>
          <td>List 2</td>
          <td></td>
        </tr>
        <tr>
          <td>List 3</td>
          <td>unsubscribed on  11/02/2019</td>
        </tr>
      </tbody>
    </table>
    gmk8@cornell.edu
    <table className="ui celled compact table">
      <thead>
        <tr>
          <th>List</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2">Primitive Pursuits</td>
        </tr>
        <tr>
          <td>List 1</td>
          <td>subscribed</td>
        </tr>
        <tr>
          <td>List 2</td>
          <td></td>
        </tr>
        <tr>
          <td>List 3</td>
          <td>unsubscribed on  11/02/2019</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Subscriptions
