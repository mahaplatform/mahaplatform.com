import { Menu, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Design from './design'
import Fields from './fields'
import React from 'react'

class Page extends React.PureComponent {

  static propTypes = {
    cid: PropTypes.string,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func
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
    const { cid, onPop, onPush } = this.props
    return {
      cid,
      onPop,
      onPush
    }
  }

  _getFields() {
    const { cid } = this.props
    return {
      cid
    }
  }

  _getMenu() {
    return {
      items: [
        { label: 'Fields', component: <Fields { ...this._getFields() } /> },
        { label: 'Design', component: <Design { ...this._getDesign() } /> }
      ]
    }
  }

  _getPanel() {
    return {
      title: 'Form',
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleSave }
      ]
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
