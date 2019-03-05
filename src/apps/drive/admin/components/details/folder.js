import PropTypes from 'prop-types'
import React from 'react'

class Folder extends React.Component {

  static propTypes = {
    folder: PropTypes.object,
    onChangeFolder: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { folder } = this.props
    const label = folder ? folder.label : 'Maha Drive'
    return (
      <div className="drive-details-folder" onClick={ this._handleClick }>
        { label }
      </div>
    )
  }

  _handleClick() {
    const { folder, onChangeFolder } = this.props
    onChangeFolder(folder)
  }

}

export default Folder
