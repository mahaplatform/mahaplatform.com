import React from 'react'

const NumberToken = ({ formatted, locality, region }) => (
  <div className="token">
    <strong>{ formatted }</strong><br />
    { locality }, { region }
  </div>
)

export default NumberToken
