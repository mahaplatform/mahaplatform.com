import { Button, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Embed extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object
  }

  textarea = null

  _handleBlur = this._handleBlur.bind(this)
  _handleCopy = this._handleCopy.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-embed">
          <div className="maha-embed-header">
            <p>You can place a <strong>Buy Tickets</strong> button on your
            website by pasting this code into your html.</p>
            <Button { ...this._getCopy() } />
          </div>
          <div className="maha-embed-body">
            <textarea { ...this._getTextArea() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getCopy() {
    return {
      label: 'Copy to Clipboard',
      className: 'ui tiny blue button',
      handler: this._handleCopy
    }
  }

  _getTextArea() {
    const { event } = this.props
    return {
      ref: node => this.textarea = node,
      spellCheck: false,
      onFocus: this._handleBlur,
      value: `<div id="button-${event.code}">Buy Tickets</div>
<script src="${process.env.WEB_HOST}/events/registrations/button.js"></script>
<script>
  new MahaButton({
    id: 'button-${event.code}',
    code: '${event.code}'
  })
</script>`
    }
  }

  _getPanel() {
    return {
      title: 'Button Code',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _handleBlur() {
    this.textarea.blur()
  }

  _handleCopy() {
    this.textarea.select()
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    this.textarea.blur()
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Embed
