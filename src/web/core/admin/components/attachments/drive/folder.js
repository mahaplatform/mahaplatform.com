import Infinite from '../../infinite'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'
import Items from './items'

class Folder extends React.Component {

  static propTypes = {
    folder: PropTypes.object,
    files: PropTypes.array,
    records: PropTypes.array,
    onAddAsset: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onRemoveAsset: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleUp = this._handleUp.bind(this)

  render() {
    const { folder } = this.props
    return (
      <div className="maha-attachments-drive-folder">
        <div className="maha-attachments-drive-header">
          <div className="maha-attachments-drive-header-breadcrumb" onClick={ this._handleUp }>
            <div className="maha-attachments-drive-header-back">
              { folder.item_id ?
                <i className="fa fa-fw fa-chevron-left" /> :
                <i className="fa fa-fw fa-home" />
              }
            </div>
            <div className="maha-attachments-drive-header-label">
              { folder.label }
            </div>
          </div>
        </div>
        <div className="maha-attachments-drive-results">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { folder } = this.props
    const $eq = folder.item_id || 'null'
    const filter = { folder_id: { $eq } }
    const empty = {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no items in this folder'
    }
    return {
      endpoint: '/api/admin/drive/items',
      filter,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: (props) => <Items { ...this._getItems() } { ...props } />
    }
  }

  _getItems() {
    const { files, onAddAsset, onChangeFolder, onRemoveAsset } = this.props
    return {
      files,
      onAddAsset,
      onChangeFolder,
      onRemoveAsset
    }
  }

  _handleUp() {
    const { folder } = this.props
    if(!folder.item_id) return
    this.props.onUp()
  }

}

export default Folder
