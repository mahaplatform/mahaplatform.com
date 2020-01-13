import { Attachments } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class File extends React.PureComponent {

  static propTypes = {
    source: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Attachments { ...this._getAttachments() } />
  }

  _getAttachments() {
    return {
      allow: {
        content_types: ['application/vnd.google-apps.spreadsheet'],
        extensions: ['csv','tsv','xls','xlsx'],
        types: ['files']
      },
      cancelText: <i className="fa fa-chevron-left" />,
      multiple: false,
      onCancel: this._handleBack,
      doneText: 'Next',
      onDone: this._handleDone
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone(assets) {
    this.props.onDone(assets[0])
  }

}

export default File
