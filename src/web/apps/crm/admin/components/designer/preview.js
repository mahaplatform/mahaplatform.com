import template from '!!raw-loader!./template.ejs'
import { devices, orientations } from './viewport'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'
import ejs from 'ejs'

class Preview extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {}

  preview = null

  render() {

    return (
      <div className={ this._getClass() }>
        <iframe { ...this._getIframe() } />
      </div>
    )
  }

  componentDidMount() {
    this._handleRender()
  }

  componentDidUpdate(prevProps) {}

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
      src: 'javascript:void(0)',
      style: {
        width: orientation.label === 'Portrait' ? device.width : device.height,
        height: orientation.label === 'Portrait' ? device.height : device.width
      }
    }
  }

  _handleRender() {
    const html = ejs.render(template, {
      ...this.props.config,
      moment,
      _
    })
    this.preview.contentWindow.document.open()
    this.preview.contentWindow.document.write(html)
    this.preview.contentWindow.document.close()
  }


}

export default Preview
