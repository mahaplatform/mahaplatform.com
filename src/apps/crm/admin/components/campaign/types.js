import CampaignToken from '../../tokens/campaign'
import { Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
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

  render() {
    const { types } = this.props
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="crm-new-campaign-types">
          <div className="crm-new-campaign-types-header">
            <Message { ...this._getOverview() } />
          </div>
          <div className="crm-new-campaign-types-body">
            { types.map((type, index) => (
              <div className="crm-new-campaign-type" key={`camaign_${index}`} onClick={ this._handleChoose.bind(this, type)}>
                <div className="crm-new-campaign-type-details">
                  <CampaignToken value={ type.value } />
                </div>
                <div className="crm-new-campaign-type-proceed">
                  <i className="fa fa-chevron-right" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalPanel>
    )
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
      title: 'Create Campaign',
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
