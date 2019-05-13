import AssetIcon from '../../asset/icon'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    network: PropTypes.string,
    records: PropTypes.array,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onList: PropTypes.func,
    onRemoveFile: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="drive-items">
        { records.map((item, index) => (
          <div className="drive-item" key={`item_${index}`}>
            <div className="drive-item-icon" onClick={ this._handleClick.bind(this, item) }>
              { item.type === 'folder' &&
                <div className="maha-asset-icon">
                  <i className="fa fa-fw fa-folder" />
                </div>
              }
              { item.type === 'file' && <AssetIcon content_type={ item.content_type } /> }
            </div>
            <div className="drive-item-name" onClick={ this._handleClick.bind(this, item) }>
              { item.name }
            </div>
            <div className="drive-item-action">
              { this._getIcon(item) }
            </div>
          </div>
        )) }
      </div>
    )
  }


  _getIcon(item) {
    const { network, files } = this.props
    if(item.type === 'folder') return <i className="fa fa-fw fa-chevron-right" />
    const file = _.find(files, { id: item.id, network })
    if(!file) return null
    return file.asset ? <i className="fa fa-fw fa-check" /> : <i className="fa fa-fw fa-spin fa-refresh" />
  }

  _handleClick(item) {
    const { onChangeFolder } = this.props
    if(item.type === 'folder') onChangeFolder(item)
    if(item.type === 'file') this._handleChooseFile(item)
  }

  _handleChooseFile(item) {
    const { network, files, onRemoveFile } = this.props
    const file = _.find(files, { id: item.id, network })
    if(file) return onRemoveFile(file)
    this.props.onCreate(`/api/admin/sources/${network}/files`, {
      id: item.id,
      name: item.name,
      network,
      thumbnail: item.thumbnail,
      content_type: item.content_type
    })
  }

}

export default Items
