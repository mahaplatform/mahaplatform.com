import PropTypes from 'prop-types'
import React from 'react'

const ButtonBlock = ({ block }) => (
  <div className="bb">
    { block.content.text }
  </div>
)

ButtonBlock.propTypes = {
  block: PropTypes.object,
  data: PropTypes.object
}

export default ButtonBlock
