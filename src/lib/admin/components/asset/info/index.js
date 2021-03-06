import AssetToken from '../../../tokens/asset'
import PropTypes from 'prop-types'
import Comments from '../../comments'
import List from '../../list'
import React from 'react'

class Info extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    comments: PropTypes.bool,
    asset: PropTypes.object
  }

  render() {
    const { asset, comments } = this.props
    return (
      <div className="maha-asset-info">
        <div className="maha-asset-info-header">
          <AssetToken { ...asset } />
        </div>
        <div className="maha-asset-info-body">
          <List { ...this._getList() } />
          { comments &&
            <Comments entity={`maha_assets/${asset.id}`} />
          }
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
        { label: 'Virus Scan', content: asset.is_infected ? 'infected' : 'uninfected' },
        { label: 'Source', content: asset.source || 'Unknown' }
      ]
    }
  }

}

export default Info
