import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    records: PropTypes.array,
    source: PropTypes.object,
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
              <i className={ `fa fa-fw fa-${this._getIcon(photo)}` } />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getIcon(photo) {
    const { files, source } = this.props
    const file = _.find(files, { id: photo.id, service: source.service })
    if(!file) return null
    return file.asset ? 'check': 'circle-o-notch'
  }

  _handleClick(photo) {
    const { source, files } = this.props
    const file = _.find(files, { id: photo.id, service: source.service })
    if(file) return this.props.onRemoveFile(file)
    this.props.onCreate(`/api/admin/profiles/${source.id}/files`, {
      id: photo.id,
      name: `${photo.id}.jpg`,
      service: source.service,
      content_type: 'image/jpeg',
      thumbnail: photo.image
    })
  }

}

export default Items
