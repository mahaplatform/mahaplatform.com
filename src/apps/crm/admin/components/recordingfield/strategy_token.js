import PropTypes from 'prop-types'
import React from 'react'

const StrategyToken = ({ icon, text, value }) => (
  <div className="crm-recordingfield-strategy-type">
    <div className="crm-recordingfield-strategy-type-icon">
      <i className={`fa fa-${ icon }`} />
    </div>
    <div className="crm-recordingfield-strategy-type-label">
      { text }
    </div>
  </div>
)

StrategyToken.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string
}

export default StrategyToken
