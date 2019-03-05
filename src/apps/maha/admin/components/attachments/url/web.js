import { Loader, Message, ModalPanel, Searchbox } from 'reframe'
import PropTypes from 'prop-types'
import React from 'react'

class Web extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    status: PropTypes.string,
    response: PropTypes.object,
    url: PropTypes.string,
    onAddAsset: PropTypes.func,
    onAddFile: PropTypes.func,
    onBack: PropTypes.func,
    onLookup: PropTypes.func,
    onImportAsset: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleImport = this._handleImport.bind(this)
  _handleLookup = this._handleLookup.bind(this)

  render() {
    const { response, status, url } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-web">
          <div className="maha-attachments-web-header">
            <Searchbox { ...this._getSearchbox() } />
          </div>
          <div className="maha-attachments-web-body">
            { status === 'pending' &&
              <Message { ...this._getIntro() } />
            }
            { status == 'previewing' && <Loader { ...this._getPreviewing() } /> }
            { status === 'previewed' && response['content-type'].match(/image/) &&
              <div className="maha-attachments-web-preview">
                <img src={ url } />
              </div>
            }
            { status === 'previewed' && !response['content-type'].match(/image/) &&
              <Message { ...this._getPreview() } />
            }
            { status == 'importing' && <Loader { ...this._getImporting() } /> }
            { status === 'failed' &&
              <Message { ...this._getFailed() } />
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { asset, status, url, onAddAsset, onBack } = this.props
    if(status !== prevProps.status && status === 'success') {
      onAddAsset(url, asset)
      onBack()
    }
  }

  _getPanel() {
    const { files, url } = this.props
    const panel = {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack  }
      ]
    }
    if( url && url.length > 0 ){
      panel.rightItems = [
        { label: 'Import', handler: this._handleImport }
      ]
    }
    return panel
  }

  _getSearchbox() {
    return {
      prompt: 'Enter a URL...',
      onChange: this._handleLookup
    }
  }

  _getIntro() {
    return {
      icon: 'globe',
      title: 'Enter a URL',
      text: 'Enter a URL to download the asset online.'
    }
  }

  _getPreviewing() {
    return {
      label: 'Loading Preview'
    }
  }

  _getImporting() {
    return {
      label: 'Importing'
    }
  }

  _getFailed() {
    return {
      icon: 'exclamation-triangle',
      title: 'Invalid URL',
      text: 'We can\'t find the image at that URL. Please check the address for typing errors.'
    }
  }

  _getPreview() {
    return {
      icon: this._getIcon(),
      text: 'foo',
      button: {
        label: 'Import File',
        handler: this._handleImport
      }
    }
  }

  _getIcon() {
    const content_type = this.props.response['content-type']
    if(content_type.match(/image/)) return 'picture-o'
    if(content_type.match(/audio/)) return 'volume-up'
    if(content_type.match(/video/)) return 'play-circle'
    if(content_type.match(/pdf/)) return 'file-pdf-o'
    if(content_type.match(/excel/)) return 'file-excel-o'
    if(content_type.match(/spreadsheet/)) return 'file-excel-o'
    if(content_type.match(/msword/)) return 'file-word-o'
    if(content_type.match(/wordprocessingml/)) return 'file-word-o'
    if(content_type.match(/document/)) return 'file-word-o'
    if(content_type.match(/powerpoint/)) return 'file-powerpoint-o'
    if(content_type.match(/presentationml/)) return 'file-powerpoint-o'
    if(content_type.match(/map/)) return 'map-o'
    if(content_type.match(/zip/)) return 'file-archive-o'
    if(content_type.match(/xml/)) return 'file-code-o'
    if(content_type.match(/html/)) return 'file-code-o'
    return 'file-text-o'
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleLookup(q) {
    if(q.length === 0) return
    this.props.onLookup(q)
  }

  _handleImport() {
    const { url, onAddFile } = this.props
    onAddFile({
      id: url,
      name: url,
      network: 'web',
      content_type: 'image/jpeg',
      thumbnail: url
    })
    this.props.onImportAsset(url)
  }

}

export default Web
