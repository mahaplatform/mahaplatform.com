import ModalPanel from '../../modal_panel'
import Searchbox from '../../searchbox'
import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import Button from '../../button'
import Loader from '../../loader'
import React from 'react'

class Web extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    cacheKey: PropTypes.string,
    doneText: PropTypes.any,
    files: PropTypes.array,
    response: PropTypes.object,
    status: PropTypes.string,
    url: PropTypes.string,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onClear: PropTypes.func,
    onDownload: PropTypes.func,
    onLookup: PropTypes.func,
    onNext: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleAdd = this._handleAdd.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleDownload = this._handleDownload.bind(this)
  _handleNext = this._handleNext.bind(this)
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
                { url &&
                  <Button { ...this._getImport() } />
                }
              </div>
            }
            { status === 'previewed' && !response['content-type'].match(/image/) &&
              <Message { ...this._getPreview() } />
            }
            { status == 'importing' && <Loader { ...this._getImporting() } /> }
            { status === 'failed' &&
              <Message { ...this._getFailed() } />
            }
            { status === 'success' &&
              <Message { ...this._getSuccess() } />
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'success') {
      this._handleAdd()
    }
  }

  _getPanel() {
    const { doneText, files } = this.props
    const panel = {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack  }
      ],
      rightItems: files.length > 0 ? [
        { label: doneText, handler: this._handleNext }
      ] : []
    }
    return panel
  }

  _getSearchbox() {
    const { cacheKey } = this.props
    return {
      key: cacheKey,
      prompt: 'Enter a URL...',
      onChange: this._handleLookup
    }
  }

  _getImport() {
    return {
      label: 'Import',
      handler: this._handleDownload
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
        handler: this._handleAdd
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

  _getSuccess() {
    return {
      icon: 'check',
      title: 'Successfully Imported',
      text: 'We successfully imported your file',
      button: {
        label: 'Import another file',
        handler: this._handleClear
      }
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleLookup(q) {
    if(q.length === 0) return
    this.props.onLookup(q)
  }

  _handleAdd() {
    const { asset, onAdd } = this.props
    onAdd({
      id: asset.id,
      source_id: 'web',
      name: asset.original_file_name,
      service: 'web',
      content_type: asset.content_type,
      asset,
      thumbnail: asset.content_type.match(/image/) ? asset.signed_url : null
    })
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleDownload() {
    const { url, onDownload } = this.props
    onDownload(url)
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Web)
