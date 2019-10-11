import React from 'react'

const NumberToken = ({ number, locality, region }) => (
  <div className="token">
    <strong>{ number }</strong><br />
    { locality }, { region }
  </div>
)

export default NumberToken
