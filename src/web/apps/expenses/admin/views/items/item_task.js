import CompactTypeToken from '../../tokens/type/compact'
import React from 'react'

const ItemTask = (type, title, text) => (
  <div className="new-item-task">
    <div className="new-item-task-icon">
      <CompactTypeToken value={ type } />
    </div>
    <div className="new-item-task-description">
      <strong>{ title }</strong><br />
      { text }
    </div>
  </div>
)

export default ItemTask
