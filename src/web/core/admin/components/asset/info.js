import PropTypes from 'prop-types'
import Comments from '../comments'
import List from '../list'
import AssetToken from './token'
import React from 'react'

class Info extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    asset: PropTypes.object
  }

  render() {
    const { asset } = this.props
    return (
      <div className="maha-asset-info">
        <div className="maha-asset-info-header">
          <AssetToken { ...asset } />
        </div>
        <div className="maha-asset-info-body">
          <List { ...this._getList() } />
          <Comments entity={`maha_assets/${asset.id}`} />
        </div>
      </div>
    )
  }

  _getList() {
    const { asset } = this.props
    return {
      items: [
        { label: 'Uploaded By', content: asset.user ? asset.user.full_name : 'Unknown' },
        { label: 'Uploaded On', content: asset.created_at, format: 'date' },
        { label: 'Source', content: asset.source || 'Unknown' }
      ]
    }
  }

}

export default Info
