import Infinite from '../../infinite'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'
import Items from './items'

class Folder extends React.Component {

  static propTypes = {
    folder: PropTypes.object,
    files: PropTypes.array,
    network: PropTypes.string,
    records: PropTypes.array,
    onAddAsset: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onRemoveAsset: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleUp = this._handleUp.bind(this)

  render() {
    const { folder } = this.props
    return (
      <div className="drive-folder">
        <div className="drive-header">
          <div className="drive-header-breadcrumb" onClick={ this._handleUp }>
            <div className="drive-header-back">
              { folder.id ?
                <i className="fa fa-fw fa-chevron-left" /> :
                <i className="fa fa-fw fa-home" />
              }
            </div>
            <div className="drive-header-label">
              { folder.name }
            </div>
          </div>
        </div>
        <div className="drive-results">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { folder, network } = this.props
    const $eq = folder.id || 'null'
    const filter = { folder_id: { $eq } }
    const empty = {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no items in this folder'
    }
    return {
      endpoint: `/api/admin/sources/${network}/files`,
      filter,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: (props) => <Items { ...this._getItems() } { ...props } />
    }
  }

  _getItems() {
    const { files, network, onAddAsset, onChangeFolder, onCreate, onRemoveAsset } = this.props
    return {
      files,
      network,
      onAddAsset,
      onChangeFolder,
      onCreate,
      onRemoveAsset
    }
  }

  _handleUp() {
    const { folder } = this.props
    if(!folder.id) return
    this.props.onUp()
  }

}

export default Folder
