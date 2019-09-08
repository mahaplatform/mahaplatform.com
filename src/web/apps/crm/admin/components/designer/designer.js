import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Preview from './preview'
import { types } from './types'
import Header from './header'
import React from 'react'
import _ from 'lodash'

class Designer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    deviceIndex: PropTypes.number,
    editable: PropTypes.bool,
    orientationIndex: PropTypes.number,
    onAdd: PropTypes.func,
    onAddSection: PropTypes.func,
    onChangeViewport: PropTypes.func,
    onClone: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onEdit: PropTypes.func,
    onEditable: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleMessage = this._handleMessage.bind(this)

  render() {
    return (
      <div className="designer">
        <div className="designer-body">
          <div className="designer-main">
            <Header { ...this._getHeader() } />
            <Preview { ...this._getPreview() } />
          </div>
          <Sidebar { ...this._getSidebar() } />
        </div>
        <div className="designer-footer">
          <div className="ui red button">
            Done
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('message', this._handleMessage, false)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleMessage, false)
  }

  _getHeader() {
    const { editable, onChangeViewport, onEditable } = this.props
    return {
      editable,
      onChange: onChangeViewport,
      onEditable
    }
  }

  _getPreview() {
    const { active, config, deviceIndex, editable, orientationIndex } = this.props
    return {
      active,
      config,
      deviceIndex,
      editable,
      orientationIndex
    }
  }

  _getSidebar() {
    const { active, config, onAddSection, onDeleteSection, onEdit, onUpdate } = this.props
    return {
      active,
      config,
      onAddSection,
      onDeleteSection,
      onEdit,
      onUpdate
    }
  }

  _handleMessage(e) {
    const message = e.data
    if(message.target !== 'designer') return
    if(message.action === 'add') this._handleAdd(message.data)
    if(message.action === 'clone') this._handleClone(message.data)
    if(message.action === 'edit') this._handleEdit(message.data)
    if(message.action === 'remove') this._handleRemove(message.data)
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

export default Designer
