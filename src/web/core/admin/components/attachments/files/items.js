import AssetIcon from '../../asset/icon'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    records: PropTypes.array,
    source: PropTypes.object,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onList: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleClick = _.debounce(this._handleClick.bind(this), 500, { leading: true })

  render() {
    const { records } = this.props
    return (
      <div className="maha-attachments-drive-items">
        { records.map((item, index) => (
          <div className="maha-attachments-drive-item" key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="maha-attachments-drive-item-icon">
              { item.type === 'folder' ?
                <div className="maha-asset-icon">
                  <i className="fa fa-fw fa-folder" />
                </div> :
                <AssetIcon content_type={ item.content_type } />
              }
            </div>
            <div className="maha-attachments-drive-item-name">
              { item.name }
            </div>
            <div className="maha-attachments-drive-item-action">
              <i className={ `fa fa-fw fa-${this._getIcon(item)}` } />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getIcon(item) {
    const { source, files } = this.props
    if(item.type === 'folder') return 'chevron-right'
    const file = _.find(files, { id: item.id, service: source.service })
    if(!file) return null
    return file.asset ? 'check': 'circle-o-notch fa-spin'
  }

  _handleClick(item) {
    const { onChangeFolder } = this.props
    if(item.type === 'folder') onChangeFolder(item)
    if(item.type === 'file') this._handleChooseFile(item)
  }

  _handleChooseFile(item) {
    const { source, files, onRemove } = this.props
    const index = _.findIndex(files, { id: item.id, service: source.service })
    if(index >= 0) return onRemove(index)
    this.props.onCreate(`/api/admin/profiles/${source.id}/files`, {
      id: item.id,
      name: item.name,
      service: source.service,
      thumbnail: item.thumbnail,
      content_type: item.content_type
    })
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Items)
