import React from 'react'

const types = {
  static: {
    title: 'Static List',
    description: 'A static list that is manually curated by an owner or when a contact subscribes or unsubscribes'
  },
  active: {
    title: 'Active List',
    description: 'A dynamic list that automatically updates with contacts that meet a user defined set of criteria'
  }
}

const ListTypeToken = ({ value }) => (
  <div className="type-token">
    <strong>{ types[value].title }</strong><br />
    { types[value].description }
  </div>
)

export default ListTypeToken
