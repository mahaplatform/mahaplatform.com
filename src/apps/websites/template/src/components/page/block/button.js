import React from 'react'
import _ from 'lodash'

function ButtonBlock({ block }) {

  return (
    <div className="bt">
      { block.content.text }
    </div>
  )

}

export default ButtonBlock
