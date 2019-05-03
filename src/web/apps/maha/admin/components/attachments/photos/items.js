import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    network: PropTypes.string,
    records: PropTypes.array,
    onRemoveFile: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onList: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-attachments-photos">
        { records.map((photo, index) => (
          <div className="maha-attachments-photo" key={`item_${index}`} onClick={ this._handleClick.bind(this, photo) } style={{backgroundImage:`url(${photo.image})`}}>
            <div className="maha-attachments-photo-image">
              { this._getIcon(photo) }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getIcon(photo) {
    const { network, files } = this.props
    const file = _.find(files, { id: photo.id, network })
    if(!file) return null
    return file.asset ? <i className="fa fa-fw fa-check" /> : <i className="fa fa-spin fa-circle-o-notch" />
  }

  _handleClick(photo) {
    const { network, files } = this.props
    const file = _.find(files, { id: photo.id, network })
    if(file) return this.props.onRemoveFile(file)
    this.props.onCreate(`/api/admin/${network}/photos`, {
      id: photo.id,
      name: `${photo.id}.jpg`,
      network,
      content_type: 'image/jpeg',
      thumbnail: photo.image
    })
  }

}

export default Items
