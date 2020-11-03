import List from '../../../../../crm/admin/components/list'
import TriggerToken from '../../../tokens/trigger'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Types extends React.PureComponent {

  static propTypes = {
    types: PropTypes.array,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="crm-new-campaign-types">
          <div className="crm-new-campaign-types-body">
            <List { ...this._getList() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getList() {
    const { types } = this.props
    return {
      format: TriggerToken,
      items: types,
      handler: this._handleChoose
    }
  }

  _getOverview() {
    return {
      backgroundColor: 'red',
      icon: 'cogs',
      title: 'Choose a trigger type',
      text: 'Choose what action will trigger this workflow'
    }
  }

  _getPanel() {
    return {
      title: 'Choose Trigger Type',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(type) {
    this.props.onChoose(type)
  }

}

export default Types
