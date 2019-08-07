import { Infinite, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Folder extends React.Component {

  static propTypes = {
    folder: PropTypes.object,
    records: PropTypes.array,
    onChangeFolder: PropTypes.func,
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
              { folder.item_id ?
                <i className="fa fa-fw fa-chevron-left" /> :
                <i className="fa fa-fw fa-home" />
              }
            </div>
            <div className="drive-header-label">
              { folder.label }
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
    const { folder, onChangeFolder } = this.props
    const code = folder.code || 'drive'
    const empty = {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no folders in this folder'
    }
    return {
      endpoint: '/api/admin/drive/items',
      filter: {
        code: { $eq: code },
        type: { $eq: 'folder' },
        access_type: { $in: ['owner','edit'] }
      },
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: Items,
      props:  {
        onChangeFolder
      }
    }
  }

  _handleUp() {
    const { folder } = this.props
    if(!folder.item_id) return
    this.props.onUp()
  }

}

export default Folder
