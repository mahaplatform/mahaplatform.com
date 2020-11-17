import { Menu, ModalPanel } from '@admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Settings from './settings'
import Design from './design'
import Fields from './fields'
import React from 'react'

class Page extends React.PureComponent {

  static propTypes = {
    cid: PropTypes.string,
    changes: PropTypes.number,
    config: PropTypes.object,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    form: PropTypes.object,
    program: PropTypes.object,
    status: PropTypes.string,
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
    const { cid, config, fields, form, program } = this.props
    return {
      cid,
      config,
      fields,
      form,
      program
    }
  }

  _getMenu() {
    return {
      items: [
        { label: 'Fields', component: <Fields { ...this._getFields() } /> },
        { label: 'Design', component: <Design { ...this._getDesign() } /> },
        { label: 'Settings', component: <Settings { ...this._getSettings() } /> }
      ]
    }
  }

  _getPanel() {
    const { changes, form, status } = this.props
    return {
      title: 'Form',
      buttons: [
        {
          label: status === 'ready' ? 'Save' : <i className="fa fa-circle-o-notch fa-spin" />,
          color: 'red',
          disabled: changes === 0,
          handler: this._handleSave
        },{
          label: 'Preview',
          color: 'red',
          link: form.url
        }
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
    const { config, endpoint } = this.props
    this.props.onSave(endpoint, config)
  }

}

const mapStateToProps = (state, props) => ({
  changes: state.forms.form_designer[props.cid].changes,
  config: state.forms.form_designer[props.cid].config
})

export default connect(mapStateToProps)(Page)
