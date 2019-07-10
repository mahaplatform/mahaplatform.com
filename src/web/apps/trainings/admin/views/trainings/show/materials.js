import { AssetToken, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Materials = ({ materials }) => {

  const list = {
    items: materials.map(material => ({
      content: material.asset,
      link: `/admin/assets/${material.asset.id}`,
      component: <AssetToken { ...material.asset } />
    })),
    empty: {
      icon: 'calendar',
      title: 'No offerings',
      text: 'There are no offerings for this training'
    }
  }

  return <List { ...list } />

}

Materials.propTypes = {
  materials: PropTypes.array
}

export default Materials
