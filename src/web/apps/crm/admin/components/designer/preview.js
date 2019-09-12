import { devices, orientations } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Preview extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    editable: PropTypes.bool,
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {}

  preview = null

  _handleMessage = this._handleMessage.bind(this)
  _handleRender = _.throttle(this._handleRender.bind(this), 250, { leading: true, trailing: false })

  render() {

    return (
      <div className={ this._getClass() }>
        <iframe { ...this._getIframe() } />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('message', this._handleMessage, false)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleMessage, false)
  }

  componentDidUpdate(prevProps) {
    const { active, config, editable } = this.props
    if(!_.isEqual(active, prevProps.active)) {
      this._handleRender()
    }
    if(!_.isEqual(config, prevProps.config)) {
      this._handleRender()
    }
    if(!_.isEqual(editable, prevProps.editable)) {
      this._handleRender()
    }
  }

  _getClass() {
    const { deviceIndex } = this.props
    const device = devices[deviceIndex]
    return `designer-preview ${device.type}`
  }

  _getIframe() {
    const { deviceIndex, orientationIndex } = this.props
    const device = devices[deviceIndex]
    const orientation = orientations[orientationIndex]
    return {
      ref: node => this.preview = node,
      src: '/admin/designer.html',
      style: {
        width: orientation.label === 'Portrait' ? device.width : device.height,
        height: orientation.label === 'Portrait' ? device.height : device.width
      }
    }
  }

  _handleMessage(e) {
    const message = e.data
    if(message.target !== 'designer') return
    if(message.action === 'ready') this._handleRender()
  }

  _handleRender() {
    const { config } = this.props
    this.preview.contentWindow.postMessage({
      target: 'designer',
      action: 'update',
      data: {
        config
      }
    }, '*')
    // const { active, config, editable } = this.props
    // const html = ejs.render(template, {
    //   editable,
    //   active,
    //   ...config,
    //   moment,
    //   _
    // })
    // this.preview.contentWindow.document.open()
    // this.preview.contentWindow.document.write(html)
    // this.preview.contentWindow.document.close()
  }


}

export default Preview
