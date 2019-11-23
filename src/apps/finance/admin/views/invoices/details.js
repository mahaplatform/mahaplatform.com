import Invoice from '../../components/invoice'
import PropTypes from 'prop-types'
import React from 'react'


const Details = ({ invoice }) => {

  return <Invoice invoice={ invoice } />

}

Details.propTypes = {
  invoice: PropTypes.object
}

export default Details
