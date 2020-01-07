import { Loader, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import Import from './import'
import Lists from './lists'
import File from './file'
import React from 'react'
import New from './new'

class Sources extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    sources: PropTypes.array,
    status: PropTypes.string,
    onDone: PropTypes.func,
    onFetch: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleImport = this._handleImport.bind(this)

  render() {
    const { status } = this.props
    const sources = this._getSources()
    if(status === 'loading') return <Loader />
    if(status !== 'loaded') return null
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

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getImport() {
    const { onPop, onDone } = this.props
    return {
      onPop,
      onDone
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

  _handleFetch() {
    this.props.onFetch()
  }

  _handleImport() {
    this.props.onPush(Import, this._getImport())
  }

  _handleJoin() {
    const { network } = this.context
    const channel = '/admin/account/profiles'
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = '/admin/account/profiles'
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

}

export default Sources
