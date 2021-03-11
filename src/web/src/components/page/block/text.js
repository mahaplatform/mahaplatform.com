import RichText from '../../richtext'
import PropTypes from 'prop-types'
import React from 'react'

const TextBlock = ({ block, data }) => (
  <div className="bt">
    { RichText(block.content.text, data) }
  </div>
)

TextBlock.propTypes = {
  block: PropTypes.object,
  data: PropTypes.object
}

export default TextBlock
