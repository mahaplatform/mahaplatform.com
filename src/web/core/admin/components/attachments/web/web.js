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
    cacheKey: PropTypes.string,
    files: PropTypes.array,
    response: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    url: PropTypes.string,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onClear: PropTypes.func,
    onLookup: PropTypes.func,
    onNext: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleAdd = this._handleAdd.bind(this)
  _handleClear = this._handleClear.bind(this)
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
                <div className="maha-attachments-web-preview-body">
                  <img src={ url } />
                </div>
                <div className="maha-attachments-web-preview-footer">
                  <Button { ...this._getImport() } />
                </div>
              </div>
            }
            { status === 'previewed' && !response['content-type'].match(/image/) &&
              <Message { ...this._getPreview() } />
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
    const { files } = this.props
    const panel = {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack  }
      ],
      rightItems: files.length > 0 ? [
        { label: 'Next', handler: this._handleNext }
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
      label: 'Add to Queue',
      color: 'red',
      handler: this._handleAdd
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

  _getPreview() {
    return {
      icon: this._getIcon(),
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

  _handleBack() {
    this.props.onBack()
  }

  _handleLookup(q) {
    if(q.length === 0) return
    this.props.onLookup(q)
  }

  _handleAdd() {
    const { response, token, url, onAdd } = this.props
    onAdd({
      id: url,
      create: {
        endpoint: '/api/admin/assets/url',
        body: { url }
      },
      source_id: 'web',
      name: response.file_name,
      service: 'web',
      content_type: response['content-type'],
      thumbnail: `/api/admin/assets/url/preview?token=${token}&url=${encodeURI(url)}`,
      status: 'pending'
    })
    this.props.onClear()
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token,
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Web)
