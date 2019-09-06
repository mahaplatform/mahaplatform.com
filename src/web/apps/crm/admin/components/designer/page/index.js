import { Menu, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Content from './content'
import Layout from './layout'
import Design from './design'
import React from 'react'

class Sidebar extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Menu { ...this._getMenu() } />
      </ModalPanel>
    )
  }

  _getMenu() {
    return {
      items: [
        { label: 'Content', component: <Content { ...this._getTab() } /> },
        { label: 'Layout', component: <Layout { ...this._getLayout() } /> },
        { label: 'Design', component: <Design { ...this._getTab() } /> }
      ]
    }
  }

  _getLayout() {
    const { config, onAddSection, onDeleteSection, onPop, onPush, onUpdate } = this.props
    return {
      config,
      onAddSection,
      onDeleteSection,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getTab() {
    const { config, onPop, onPush, onUpdate } = this.props
    return {
      config,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getPanel() {
    return {
      title: 'Email'
    }
  }

}

export default Sidebar
