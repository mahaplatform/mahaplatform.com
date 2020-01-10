import { ModalPanel, ProgressPie } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Import extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    mapping: PropTypes.object,
    parse: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    _import: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-parsing">
          <ProgressPie { ...this._getProgress() } />
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleCreate()
  }


  _getPanel() {
    // const { status } = this.props
    const status = 'ready'
    const panel = {
      title: 'Parsing Import',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
    if(status === 'ready') {
      panel.rightItems = [
        { label: 'Next', handler: this._handleDone }
      ]
    }
    return panel
  }

  _getProgress() {
    // const { progress } = this.props
    const progress = .64
    return {
      percent: progress ? (progress.completed/ progress.total) * 100 : 0,
      title: 'Importing contacts',
      label: progress ? `${progress.completed}/${progress.total}` : ''
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleCreate() {
    const { asset, parse, mapping } = this.props
    this.context.network.request({
      endpoint: '/api/admin/crm/imports/parse',
      method: 'post',
      body: {
        asset_id: asset.id,
        parse,
        mapping
      }
    })
  }

  _handleDone() {
    const { _import } = this.state
    this.props.onDone(_import)
  }

}

export default Import
