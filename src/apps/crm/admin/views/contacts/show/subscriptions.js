import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Subscriptions = ({ contact, subscriptions }) => (
  <div className="crm-contact-subscriptions">
    <table className="ui unstackable compact table">
      <tbody>
        { subscriptions.map((program, i) => [
          <tr key={`program_${i}`} className="crm-contact-subscriptions-program">
            <td colSpan="2">
              <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
              { program.title }
            </td>
          </tr>,
          ...program.lists.map((list, j) => (
            <tr key={`subscriptions_${j}`} className="crm-contact-subscriptions-list">
              <td className="collapsing">
                { list.is_subscribed ?
                  <i className="fa fa-check-circle" /> :
                  <i className="fa fa-circle-o" />
                }
              </td>
              <td>{ list.title }</td>
            </tr>
          )),
          ...program.lists.length === 0 ? [(
            <tr key="subscriptions_empty" className="crm-contact-subscriptions-empty">
              <td colSpan="2">
                There are no lists for this program
              </td>
            </tr>
          )] : []
        ]) }
      </tbody>
    </table>
  </div>
)

export default Subscriptions
