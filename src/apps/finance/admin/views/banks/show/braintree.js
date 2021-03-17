import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'

const Braintree = ({ bank }, { flash }) => {

  if(bank.braintree_id) {

    return (
      <div className="maha-list-status success">
        Your bank account is connected to Braintree
      </div>
    )

  } else if(bank.applied_on) {

    return (
      <div className="maha-list-status warning">
        Thank you for completing the signup process for this account. We&apos;ll
        connect it as soon as we receive notice from Braintree.
      </div>
    )

  } else {

    const signup = {
      label: 'Signup with Braintree',
      className: 'ui blue button',
      link: 'https://apply.braintreegateway.com/signup/us?partner_source=referrer_id=0062E00001GnA8AQAV_0032E00002bbcZ4QAI'
    }

    const complete = {
      label: 'I\'ve Completed the Application',
      className: 'ui blue button',
      request: {
        method: 'patch',
        endpoint: `/api/admin/finance/banks/${bank.id}/apply`
      }
    }

    return (
      <div className="maha-list-status warning">
        Before you can begin accepting digital payments and depositing the
        funds into this this bank account, you must first create a merchant
        account with Braintree (a PayPal Company). This involves a small
        underwriting process in which you will be asked to provide supporting
        documentation as well as name a authorized individual for your
        organization.
        <Button { ...signup } />
        <Button { ...complete } />
      </div>
    )

  }

}

Braintree.contextTypes = {
  flash: PropTypes.object
}

Braintree.propTypes = {
  bank: PropTypes.object
}

export default Braintree
