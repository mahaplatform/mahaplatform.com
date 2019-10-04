import { Menu, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
    onPreview: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handlePreview = this._handlePreview.bind(this)
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
        { label: 'Design', component: <Design { ...this._getTab() } /> }
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
        },{
          label: 'Preview',
          color: 'red',
          handler: this._handlePreview
        }
      ]
    }
  }

  _handlePreview() {
    this.props.onPreview()
  }

  _handleSave() {
    const { config } = this.props
    this.props.onSave(config)
  }

}

const mapStateToProps = (state, props) => ({
  changes: state.crm.designer.changes,
  config: state.crm.designer.config
})

export default connect(mapStateToProps)(Page)
