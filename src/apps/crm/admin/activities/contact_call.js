import { AssetToken, Container } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Call extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object,
    call: PropTypes.object,
    program: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { call } = this.props
    return (
      <div className="crm-card">
        { call.description.split('\n').map((line, index) => (
          <span key={`line_${index}`}>{ line }<br /></span>
        )) }
        { call.attachments.map((asset, index) => (
          <div className="crm-card-asset" key={`asset_${index}`}>
            <AssetToken { ...asset } />
          </div>
        ))}
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  call: `/api/admin/crm/contacts/${props.activity.contact.id}/calls/${props.activity.data.call_id}`
})

export default Container(mapResources)(Call)
