import RichText from './richtext'
import React from 'react'

function TextBlock({ children, config }) {
  return (
    <div>
      { RichText(config.body, config) }
    </div>
  )
}

export default TextBlock
