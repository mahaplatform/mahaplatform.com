import AssetToken from '../../tokens/asset'
import PropTypes from 'prop-types'
import React from 'react'

class Asset extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { asset } = this.props
    return (
      <div className="maha-attachment-asset">
        <AssetToken { ...asset } onClick={ this._handleClick } />
      </div>
    )
  }

  _handleClick() {
    const { asset } = this.props
    const { router } = this.context
    router.push(`/admin/assets/${asset.id}`)
  }

}

export default Asset
