import React from 'react'

const Token = ({ asset_ids, message }) => (
  <div>
    { asset_ids &&
      <div>
        <img src="/imagecache/fit=cover&w=100&h=100/assets/8121/hardcider.jpeg" />
      </div>
    }
    { message }
  </div>
)

export default Token
