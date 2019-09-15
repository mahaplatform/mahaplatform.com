import { devices, orientations } from './variables'
import PropTypes from 'prop-types'
import { types } from './types'
import Pasteur from 'pasteur'
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
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {}

  preview = null

  _handleAdd = this._handleAdd.bind(this)
  _handleClone = this._handleClone.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleRender = _.throttle(this._handleRender.bind(this), 250, { leading: true, trailing: false })

  componentDidMount() {
    this.pasteur = new Pasteur({
      window,
      target: this.preview.contentWindow,
      name: 'designerComponent',
      targetName: 'designerCanvas',
      services: {
        designer: {
          add: this._handleAdd,
          clone: this._handleClone,
          edit: this._handleEdit,
          remove: this._handleRemove,
          ready: this._handleRender
        }
      }
    })
  }

  componentWillUnmount() {
    this.pasteur.close()
  }

  render() {
    return (
      <div className={ this._getClass() }>
        <iframe { ...this._getIframe() } />
      </div>
    )
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

  _handleRender() {
    const { config } = this.props
    this.pasteur.send('designer', 'update', { config })
  }

  _handleAdd({ section, type, index }) {
    const content_type = _.find(types, { type })
    this.props.onAdd(section, index, {
      type: content_type.type,
      ...content_type.config
    })
  }

  _handleClone({ section, block }) {
    this.props.onClone(section, block)
  }

  _handleEdit({ section, block }) {
    this.props.onEdit(section, block)
  }

  _handleRemove({ section, block }) {
    this.props.onRemove(section, block)
  }

}

export default Preview
