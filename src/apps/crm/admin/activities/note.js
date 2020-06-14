import { AssetToken, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Note extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object,
    note: PropTypes.object,
    program: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { note } = this.props
    return (
      <div className="crm-card">
        { note.text.split('\n').map((line, index) => (
          <span key={`line_${index}`}>{ line }<br /></span>
        )) }
        { note.attachments.map((asset, index) => (
          <div className="crm-card-asset" key={`asset_${index}`}>
            <AssetToken { ...asset } />
          </div>
        ))}
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  note: `/api/admin/crm/contacts/${props.activity.contact.id}/notes/${props.activity.data.note_id}`
})

export default Container(mapResources)(Note)
