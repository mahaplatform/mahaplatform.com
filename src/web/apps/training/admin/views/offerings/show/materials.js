import { AssetToken, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Materials = ({ materials }) => {

  const list = {
    items: materials.map(material => ({
      content: material.asset,
      link: `/admin/training/trainings/${material.training_id}/materials/${material.id}`,
      component: <AssetToken { ...material.asset } />
    })),
    empty: {
      icon: 'files-o',
      title: 'No materials',
      text: 'There are no materials for this training'
    }
  }

  return <List { ...list } />

}

Materials.propTypes = {
  materials: PropTypes.array
}

export default Materials
