import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Signup = ({ merchant }, { flash }) => {

  if(merchant.applied_on) {

    return (
      <div className="finance-braintree-signup">
        <div className="finance-braintree-signup-icon">
          <i className="fa fa-check" />
        </div>
        <div className="finance-braintree-signup-details">
          <p>
            Thank you for completing the signup process for this account. We&apos;ll
            connect it as soon as we receive notice from Braintree.
          </p>
        </div>
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
        endpoint: `/api/admin/finance/merchants/${merchant.id}/apply`
      }
    }

    return (
      <div className="finance-braintree-signup">
        <div className="finance-braintree-signup-details">
          <p>
            Before you can begin accepting digital payments and depositing the
            funds into this this bank account, you must first create a merchant
            account with Braintree (a PayPal Company). This involves a small
            underwriting process in which you will be asked to provide supporting
            documentation as well as name a authorized individual for your
            organization.
          </p>
          <Button { ...signup } />
          <Button { ...complete } />
        </div>
      </div>
    )

  }

}

Signup.contextTypes = {
  flash: PropTypes.object
}

Signup.propTypes = {
  merchant: PropTypes.object
}

export default Signup
