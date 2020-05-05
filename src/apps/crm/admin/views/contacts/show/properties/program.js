import { Image, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    fields: PropTypes.array,
    lists: PropTypes.array,
    program: PropTypes.object,
    topics: PropTypes.array
  }

  state = {
    expanded: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded } = this.state
    const { program } = this.props
    return (
      <div className="crm-contact-properties-program">
        <div className="crm-contact-properties-header" onClick={ this._handleToggle }>
          <div className="crm-contact-properties-header-toggle">
            <i className={`fa fa-fw fa-chevron-${this._getIcon()}`} />
          </div>
          <div className="crm-contact-properties-header-logo">
            <Image src={ program.logo } transforms={{ fit: 'cover', w: 24, h: 24 }} />
          </div>
          <div className="crm-contact-properties-header-title">
            { program.title }
          </div>
        </div>
        { expanded &&
          <div className="crm-contact-properties-body">
            <List {...this._getList() } />
          </div>
        }
      </div>
    )
  }

  _getIcon() {
    const { expanded } = this.state
    return expanded ? 'down' : 'right'
  }

  _getList() {
    const { contact, fields, lists, topics } = this.props
    return {
      items: [
        { label: 'Lists', content: lists.length > 0 ? lists.map(list => list.title).join(', ') : 'NONE' },
        { label: 'Topics', content: topics.length > 0 ? topics.map(topic => topic.title).join(', ') : 'NONE' },
        ...fields.map(field => ({
          label: field.label,
          content: contact.values[field.code]
        }))
      ]
    }
  }

  _handleToggle() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Program
