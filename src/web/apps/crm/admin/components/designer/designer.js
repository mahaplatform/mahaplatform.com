import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Preview from './preview'
import Header from './header'
import React from 'react'

class Designer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    onChangeViewport: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleMessage = this._handleMessage.bind(this)

  render() {
    return (
      <div className="designer">
        <div className="designer-main">
          <Header { ...this._getHeader() } />
          <Preview { ...this._getPreview() } />
        </div>
        <Sidebar { ...this._getSidebar() } />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('message', this._handleMessage, false)
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {
    window.removeEventListener('message', this._handleMessage, false)
  }

  _getHeader() {
    const { onChangeViewport } = this.props
    return {
      onChange: onChangeViewport
    }
  }

  _getPreview() {
    const { active, config, deviceIndex, orientationIndex } = this.props
    return {
      active,
      config,
      deviceIndex,
      orientationIndex
    }
  }

  _getSidebar() {
    const { active, config, onEdit, onUpdate } = this.props
    return {
      active,
      config,
      onEdit,
      onUpdate
    }
  }

  _handleMessage(e) {
    const message = e.data
    if(message.target !== 'designer') return
    if(message.action === 'clone') this._handleClone(message.data)
    if(message.action === 'edit') this._handleEdit(message.data)
    if(message.action === 'remove') this._handleRemove(message.data)
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
