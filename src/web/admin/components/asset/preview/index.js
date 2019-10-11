import PropTypes from 'prop-types'
import AssetViewer from '../viewer'
import Info from '../info'
import React from 'react'

class Preview extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    comments: PropTypes.bool
  }

  static defaultProps = {
    comments: false
  }

  render() {
    const { asset, comments } = this.props
    return (
      <div className="maha-asset-preview">
        <div className="maha-asset-preview-main">
          <div className="maha-asset-preview-body">
            <AssetViewer asset={ asset } />
          </div>
          { document.body.clientWidth > 768 &&
            <div className="maha-asset-preview-sidebar">
              <Info asset={ asset } comments={ comments } />
            </div>
          }
        </div>
      </div>
    )
  }

}

export default Preview
