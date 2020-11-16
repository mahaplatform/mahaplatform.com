import RichText from './richtext'
import Style from './style'
import React from 'react'

function TextBlock({ children, config }) {
  return RichText(config.body, config)
}

export default TextBlock
