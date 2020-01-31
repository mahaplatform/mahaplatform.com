import { Menu, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Settings from './settings'
import Design from './design'
import Fields from './fields'
import Rules from './rules'
import React from 'react'

class Page extends React.PureComponent {

  static childContextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    code: PropTypes.string,
    config: PropTypes.object,
    fields: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Menu { ...this._getMenu() } />
      </ModalPanel>
    )
  }

  getChildContext() {
    const { onPop, onPush } = this.props
    return {
      form: {
        push: onPush,
        pop: onPop
      }
    }
  }

  _getDesign() {
    const { cid, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getFields() {
    const { cid, fields } = this.props
    return {
      cid,
      fields
    }
  }

  _getMenu() {
    return {
      items: [
        { label: 'Fields', component: <Fields { ...this._getFields() } /> },
        { label: 'Design', component: <Design { ...this._getDesign() } /> },
        { label: 'Settings', component: <Settings { ...this._getSettings() } /> },
        { label: 'Rules', component: <Rules { ...this._getRules() } /> }
      ]
    }
  }

  _getPanel() {
    const { code } = this.props
    return {
      title: 'Form',
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleSave },
        { label: 'Preview', color: 'red', link: `${process.env.WEB_HOST}/crm/forms/${code}` }
      ]
    }
  }

  _getSettings() {
    const { cid, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getRules() {
    const { cid, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      onPop,
      onPush,
      onUpdate
    }
  }

  _handleSave() {
    const { config } = this.props
    this.props.onSave(config)
  }

}

const mapStateToProps = (state, props) => ({
  changes: state.crm.form_designer[props.cid].changes,
  config: state.crm.form_designer[props.cid].config
})

export default connect(mapStateToProps)(Page)
