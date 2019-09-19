import Multiple from '../review/multiple'
import PropTypes from 'prop-types'
import React from 'react'

class Review extends React.Component {

  static propTypes = {
    onClose: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    return (
      <div className="maha-attachments-explorer-review">
        <div className="maha-attachments-explorer-review-header" onClick={ this._handleClose }>
          Close
        </div>
        <div className="maha-attachments-explorer-review-body">
          <Multiple { ...this._getMultiple() } />
        </div>
      </div>
    )
  }

  _getMultiple() {
    const { onRemove } = this.props
    return {
      onRemove
    }
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Review
