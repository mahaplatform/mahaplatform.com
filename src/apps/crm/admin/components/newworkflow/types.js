import TriggerToken from '../../tokens/trigger'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import List from '../list'
import React from 'react'

class Types extends React.PureComponent {

  static propTypes = {
    types: PropTypes.array,
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
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
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(type) {
    this.props.onChoose(type)
  }

}

export default Types
