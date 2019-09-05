import { Menu, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Content from './content'
import Style from './Style'
import React from 'react'

class Sidebar extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
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
        { label: 'Style', component: <Style { ...this._getTab() } /> }
      ]
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
