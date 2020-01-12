import { Loader, Message, ModalPanel } from 'maha-admin'
import Contacts from './service/contacts'
import Lists from './service/lists'
import PropTypes from 'prop-types'
import File from './file'
import React from 'react'
import New from './new'

class Sources extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func,
    onFetch: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    sources: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(this.state.sources === null) return <Loader />
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
                { (source.service || source.image) &&
                  <img src={`/images/services/${source.service || source.image}.png`} />
                }
                { source.icon &&
                  <i className={`fa fa-${source.icon}`} />
                }
              </div>
              <div className="contactimport-source-label">
                { source.username ?
                  <span>{ source.label } ({ source.username })</span> :
                  <span>{ source.label }</span>
                }
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

  _getService(service) {
    if(service === 'constantcontact') return { component: Lists, label: 'Constant Contact' }
    if(service === 'googlecontacts') return { component: Contacts, label: 'Google Contacts' }
    if(service === 'mailchimp') return { component: Lists, label: 'MailChimp' }
    if(service === 'outlook') return { component: Contacts, label: 'Outlook 365' }
  }

  _getSources() {
    const { sources } = this.state
    return [
      { label: 'Excel or CSV file', image: 'excel', component: File },
      ...sources.map(source => ({
        ...source,
        ...this._getService(source.service)
      })),
      { label: 'Add a source', icon: 'plus-circle', component: <New { ...this._getNew() } /> }
    ]
  }

  _getSource(source) {
    const { onDone, onPop, onPush } = this.props
    return {
      source,
      onDone,
      onBack: onPop,
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
    this.context.network.request({
      method: 'get',
      endpoint: '/api/admin/profiles',
      query: {
        $filter: {
          type: {
            $in: ['contacts']
          }
        }
      },
      onSuccess: this._handleSuccess
    })
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

  _handleSuccess(result) {
    this.setState({
      sources: result.data
    })
  }

}

export default Sources
