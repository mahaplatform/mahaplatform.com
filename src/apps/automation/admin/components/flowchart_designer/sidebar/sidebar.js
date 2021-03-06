import { Menu, ModalPanel, Versions } from '@admin'
import PropTypes from 'prop-types'
import Content from './content'
import React from 'react'

class Sidebar extends React.Component {

  static propTypes = {
    blocks: PropTypes.array,
    changes: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.object,
    entity: PropTypes.string,
    status: PropTypes.string,
    version: PropTypes.object,
    versions: PropTypes.array,
    onSetVersion: PropTypes.func
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel()}>
        <Menu { ...this._getMenu() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Workflow'
    }
  }

  _getMenu() {
    const items = [
      { label: 'Blocks', component: <Content { ...this._getContent() } /> },
      { label: 'Versions', component: <Versions { ...this._getVersions() } /> }
    ]
    return { items }
  }

  _getContent() {
    const { blocks, changes, cid, config, status } = this.props
    return {
      blocks,
      changes,
      cid,
      config,
      status
    }
  }

  _getVersions() {
    const { entity, version, versions, onSetVersion } = this.props
    return {
      entity: `${entity}/config`,
      version,
      versions,
      onSetVersion
    }
  }

}


export default Sidebar
