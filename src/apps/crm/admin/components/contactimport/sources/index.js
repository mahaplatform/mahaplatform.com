import { Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import Import from './import'
import Lists from './lists'
import File from './file'
import React from 'react'
import New from './new'

class Sources extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    sources: PropTypes.array,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleConfigure = this._handleConfigure.bind(this)
  _handleImport = this._handleImport.bind(this)

  render() {
    const sources = this._getSources()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="contactimport-sources-header">
          <Message { ...this._getOverview() } />
        </div>
        <div className="contactimport-sources-body">
          { sources.map((source, index) => (
            <div className="contactimport-source" key={`source_${index}`} onClick={ this._handleClick.bind(this, source) }>
              <div className="contactimport-source-service">
                { source.service &&
                  <img src={`/images/services/${source.service}.png`} />
                }
                { source.icon &&
                  <i className={`fa fa-${source.icon}`} />
                }
              </div>
              <div className="contactimport-source-label">
                { source.label || source.username }
              </div>
              <div className="contactimport-source-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  _getFile() {
    const { onPop, onPush } = this.props
    return {
      onPop,
      onPush
    }
  }

  _getNew() {
    const { onPop } = this.props
    return {
      onPop
    }
  }

  _getOverview() {
    return {
      backgroundColor: 'red',
      icon: 'download',
      title: 'Choose Source',
      text: 'Import contacts from wherever you keep them.'
    }
  }

  _getPanel() {
    return {
      title: 'Import Contacts',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getServiceComponent(service) {
    if(service === 'constantcontact') return Lists
    if(service === 'googlecontacts') return Contacts
    if(service === 'mailchimp') return Lists
    if(service === 'outlook') return Contacts
  }

  _getSources() {
    const { sources } = this.props
    return [
      { label: 'Excel or CSV file', service: 'excel', component: File },
      ...sources.map(source => ({
        ...source,
        component: this._getServiceComponent(source.service)
      })),
      { label: 'Add a source', icon: 'plus-circle', component: <New { ...this._getNew() } /> }
    ]
  }

  _getSource(source) {
    const { onPop, onPush } = this.props
    return {
      source,
      onDone: this._handleImport,
      onPop,
      onPush
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleClick(source) {
    this.props.onPush(source.component, this._getSource(source))
  }

  _handleImport() {
    const { onPop, onDone } = this.props
    this.props.onPush(Import, {
      onPop,
      onDone
    })
  }

}

export default Sources
