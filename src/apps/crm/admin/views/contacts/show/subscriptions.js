import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import React from 'react'

const Subscriptions = ({ contact, subscriptions }) => (
  <div className="crm-contact-subscriptions">
    <table className="ui unstackable compact table">
      <tbody>
        { subscriptions.map((program, i) => [
          <tr key={`program_${i}`} className="crm-contact-subscriptions-program">
            <td>
              <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
              { program.title }
            </td>
          </tr>,
          ...program.lists.length > 0 ? program.lists.map((list, j) => (
            <tr key={`subscriptions_${j}`} className="crm-contact-subscriptions-list">
              <td className="collapsing">
                { list.is_subscribed ?
                  <i className="fa fa-check-circle" /> :
                  <i className="fa fa-circle-o" />
                } { list.title }
              </td>
            </tr>
          )) : [(
            <tr className="crm-contact-subscriptions-empty" key="empty">
              <td>
                This program has no lists
              </td>
            </tr>
          )]
        ]) }
      </tbody>
    </table>
  </div>
)

Subscriptions.propTypes = {
  contact: PropTypes.object,
  subscriptions: PropTypes.array
}

export default Subscriptions
