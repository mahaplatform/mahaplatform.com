import { Menu, ModalPanel } from '@admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Settings from './settings'
import Content from './content'
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
    endpoint: PropTypes.string,
    program_id: PropTypes.number,
    settings: PropTypes.bool,
    status: PropTypes.string,
    title: PropTypes.string,
    onPop: PropTypes.func,
    onPreview: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func,
    onTokens: PropTypes.func,
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
    const {settings} = this.props
    const items = [
      { label: 'Blocks', component: <Content { ...this._getContent() } /> },
      { label: 'Design', component: <Design { ...this._getDesign() } /> }
    ]
    if(settings) {
      items.push({ label: 'Settings', component: <Settings { ...this._getSettings() } /> })
    }
    return { items }
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
    const { cid, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getPanel() {
    const { changes, status, title } = this.props
    return {
      title,
      buttons: [
        {
          label: status === 'ready' ? 'Save' : <i className="fa fa-circle-o-notch fa-spin" />,
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
    const { cid, program_id, onTokens, onUpdate } = this.props
    return {
      cid,
      program_id,
      onTokens,
      onUpdate
    }
  }

  _handlePreview() {
    this.props.onPreview()
  }

  _handleSave() {
    const { config, endpoint } = this.props
    this.props.onSave(endpoint, config)
  }

}

const mapStateToProps = (state, props) => ({
  changes: state.maha.designer[props.cid].changes,
  config: state.maha.designer[props.cid].config
})

export default connect(mapStateToProps)(Page)
