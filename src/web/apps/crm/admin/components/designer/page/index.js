import { Menu, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Preview from './preview'
import Content from './content'
import Layout from './layout'
import Design from './design'
import React from 'react'

class Page extends React.Component {

  static contextTypes = {}

  static propTypes = {
    changes: PropTypes.number,
    config: PropTypes.object,
    onAddSection: PropTypes.func,
    onMoveSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleRevert = this._handleRevert.bind(this)
  _handleSave = this._handleSave.bind(this)

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
        { label: 'Layout', component: <Layout { ...this._getLayout() } /> },
        { label: 'Content', component: <Content { ...this._getTab() } /> },
        { label: 'Design', component: <Design { ...this._getTab() } /> },
        { label: 'Preview', component: <Preview { ...this._getTab() } /> }
      ]
    }
  }

  _getLayout() {
    const { config, onAddSection, onDeleteSection, onMoveSection, onPop, onPush, onUpdate } = this.props
    return {
      config,
      onAddSection,
      onDeleteSection,
      onMoveSection,
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
    const { changes } = this.props
    return {
      title: 'Email',
      buttons: [
        {
          label: 'Save',
          color: 'red',
          disabled: changes === 0,
          handler: this._handleSave
        }
      ]
    }
  }

  _handleRevert() {}

  _handleSave() {}

}

const mapStateToProps = (state, props) => ({
  changes: state.crm.designer.changes
})

export default connect(mapStateToProps)(Page)
