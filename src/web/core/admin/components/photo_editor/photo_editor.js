import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Toolbar from './toolbar'
import Canvas from './canvas'
import React from 'react'

class PhotoEditor extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    asset: PropTypes.object,
    asset_id: PropTypes.number,
    defaultValue: PropTypes.object,
    status: PropTypes.string,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onFetch: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-photoeditor">
          <Toolbar { ...this._getToolbar() } />
          { status === 'loaded' &&
            <Canvas { ...this._getCanvas() } />
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { asset_id } = this.props
    if(asset_id !== prevProps.asset_id) {
      this._handleFetch()
    }
  }

  _getCanvas() {
    const { asset, transforms } = this.props
    return {
      asset,
      transforms
    }
  }

  _getPanel() {
    return {
      title: 'Photo Editor'
    }
  }

  _getToolbar() {
    const { onAdjust } = this.props
    return {
      onAdjust
    }
  }

  _handleFetch() {
    const { asset_id, onFetch } = this.props
    onFetch(asset_id)
  }

  _handleSet({ asset_id, transforms }) {
    this.props.onSet(asset_id, transforms)
  }

}

export default PhotoEditor
