import { Menu } from 'maha-admin'
import PropTypes from 'prop-types'
import Content from './content'
import Design from './design'
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
    return <Menu { ...this._getMenu() } />
  }

  _getMenu() {
    return {
      items: [
        { label: 'Content', component: <Content { ...this._getContent() } /> },
        { label: 'Design', component: <Design { ...this._getDesign() } /> }
      ]
    }
  }

  _getContent() {
    const { config, onPop, onPush, onUpdate } = this.props
    return {
      config,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getDesign() {
    const { config, onPop, onPush, onUpdate } = this.props
    return {
      config,
      onPop,
      onPush,
      onUpdate
    }
  }

}

export default Sidebar
