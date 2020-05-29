import Content from '../../../../tokens/content'
import { Logo, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

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
    const total = this._getTotal()
    return (
      <div className="crm-contact-properties-program">
        <div className="crm-contact-properties-header" onClick={ this._handleToggle }>
          <div className="crm-contact-properties-header-toggle">
            <i className={`fa fa-fw fa-chevron-${this._getIcon()}`} />
          </div>
          <div className="crm-contact-properties-header-logo">
            <Logo team={ program } width="24" />
          </div>
          <div className="crm-contact-properties-header-title">
            { program.title }
          </div>
          { total > 0 &&
            <div className="crm-contact-properties-header-total">
              <div className="crm-contact-properties-header-total-count">
                { total }
              </div>
            </div>
          }
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
        { label: 'Lists', content: lists.length > 0 ? lists.map(list => list.title).join(', ') : '' },
        { label: 'Topics', content: topics.length > 0 ? topics.map(topic => topic.title).join(', ') : '' },
        ...fields.map(field => ({
          label: field.label,
          content: <Content data={ contact.values } field={ field } />
        }))
      ]
    }
  }

  _getTotal() {
    const { contact, fields, lists, topics } = this.props
    return lists.length + topics.length + fields.filter(field => {
      return !_.isNil(contact.values[field.code])
    }).length
  }

  _handleToggle() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Program
