import CampaignToken from '../../tokens/campaign'
import { Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import List from '../list'
import React from 'react'

class Types extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    types: PropTypes.array,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  static defaultProps = {}

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
      format: CampaignToken,
      sections: [
        {
          title: 'Inbound Campaigns',
          items: types.filter(type => {
            return type.direction === 'inbound'
          })
        }, {
          title: 'Outbound Campaigns',
          items: types.filter(type => {
            return type.direction === 'outbound'
          })
        }
      ],
      handler: this._handleChoose
    }
  }

  _getOverview() {
    return {
      backgroundColor: 'red',
      icon: 'bullhorn',
      title: 'Choose a campaign type',
      text: 'Choose the type best suited to help you reach your audience'
    }
  }

  _getPanel() {
    return {
      title: 'Choose Campaign Type',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel}
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
