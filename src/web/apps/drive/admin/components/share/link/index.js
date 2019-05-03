import { AssetToken, ModalPanel, Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Link extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object,
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { item } = this.props
    const link = process.env.WEB_HOST + '/drive/share/' + item.code
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="drive-share-header">
          <AssetToken { ...item.asset } />
        </div>
        <div className="drive-share-body">
          <h3>Share Online</h3>
          <p>You can share the following link to give access to anyone online</p>
          <div className="drive-share-link">
            <div className="drive-share-link-text">
              <a href={ link } target="_blank" rel="noopener noreferrer">
                { link }
              </a>
            </div>
            <div className="drive-share-link-button">
              <Button { ...this._getCopyLinkButton(link) } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getCopyLinkButton(link) {
    return {
      label: 'Copy Link',
      handler: this._copyLink.bind(this, link)
    }
  }

  _copyLink(str) {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
    document.getElementsByClassName('ui button')[0].innerHTML = ' Copied! '
    setTimeout(() => {
      document.getElementsByClassName('ui button')[0].innerHTML = 'Copy Link'
    }, 1200);


  }

  _getPanel() {
    return {
      title: 'Share via Link',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]

    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Link
