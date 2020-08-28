import Dependencies from '../dependencies'
import Highlight from 'react-highlight'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Button from '../button'
import React from 'react'

class Embed extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    title: PropTypes.string,
    header: PropTypes.object,
    code: PropTypes.string,
    event: PropTypes.object
  }

  state = {
    label: 'Copy to Clipboard'
  }

  _handleCopy = this._handleCopy.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { code, header } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-embed">
          <div className="maha-embed-header">
            { header }
            <Button { ...this._getCopy() } />
          </div>
          <div className="maha-embed-body">
            <div className="maha-embed-code">
              <Highlight className="html">
                { code }
              </Highlight>
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getCopy() {
    const { label } = this.state
    return {
      label,
      className: 'ui tiny blue button',
      handler: this._handleCopy
    }
  }

  _getPanel() {
    const { title } = this.props
    return {
      title,
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _handleCopy() {
    const { code } = this.props
    const textarea = document.createElement('textarea')
    textarea.value = code
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    this.setState({
      label: 'Copied!'
    })
    setTimeout(() => {
      this.setState({
        label: 'Copy to Clipboard'
      })
    }, 1500)
  }

  _handleDone() {
    this.context.modal.close()
  }

}

const dependencies = {
  styles: [
    `${process.env.WEB_ASSET_CDN_HOST}/admin/css/atom-one-dark.min.css`
  ]
}

Embed = Dependencies(dependencies)(Embed)

export default Embed
