import { Menu, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Settings from './settings'
import Content from './content'
import Layout from './layout'
import Design from './design'
import React from 'react'

class Page extends React.Component {

  static contextTypes = {}

  static propTypes = {
    blocks: PropTypes.array,
    changes: PropTypes.number,
    cid: PropTypes.string,
    components: PropTypes.object,
    config: PropTypes.object,
    title: PropTypes.string,
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
        { label: 'Content', component: <Content { ...this._getContent() } /> },
        { label: 'Layout', component: <Layout { ...this._getLayout() } /> },
        { label: 'Design', component: <Design { ...this._getDesign() } /> },
        { label: 'Settings', component: <Settings { ...this._getSettings() } /> }
      ]
    }
  }

  _getContent() {
    const { blocks, cid, onPop, onPush, onUpdate } = this.props
    return {
      blocks,
      cid,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getDesign() {
    const { cid, components, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      components,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getLayout() {
    const { cid, onAddSection, onDeleteSection, onMoveSection, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      onAddSection,
      onDeleteSection,
      onMoveSection,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getPanel() {
    const { changes, title } = this.props
    return {
      title,
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

  _getSettings() {
    const { cid, onUpdate } = this.props
    return {
      cid,
      onUpdate
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
  changes: state.crm.designer[props.cid].changes,
  config: state.crm.designer[props.cid].config
})

export default connect(mapStateToProps)(Page)
