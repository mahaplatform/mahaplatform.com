import { Loader, ModalPanel } from 'maha-admin'
import Contacts from './service/contacts'
import Configure from './configure'
import Lists from './service/lists'
import PropTypes from 'prop-types'
import Import from './import'
import File from './file'
import React from 'react'
import New from './new'

class Sources extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    program: PropTypes.object,
    onDone: PropTypes.func,
    onFetch: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    sources: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleConfigure = this._handleConfigure.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleImport = this._handleImport.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(this.state.sources === null) return <Loader />
    const sources = this._getSources()
    return (
      <ModalPanel { ...this._getPanel() }>
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

  _getConfigure(params) {
    const { onPop } = this.props
    return {
      params,
      onBack: onPop,
      onDone: this._handleImport
    }
  }

  _getImport(params) {
    const { program, onDone } = this.props
    return {
      params,
      program,
      onDone
    }
  }

  _getNew() {
    const { onPop } = this.props
    return {
      onPop
    }
  }

  _getPanel() {
    return {
      title: 'Choose Contact Source',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
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
    const { onPop, onPush } = this.props
    return {
      source,
      onDone: this._handleConfigure,
      onBack: onPop,
      onPop,
      onPush
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleClick(source) {
    this.props.onPush(source.component, this._getSource(source))
  }

  _handleConfigure(params) {
    this.props.onPush(Configure, this._getConfigure(params))
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

  _handleImport(params) {
    this.props.onPush(Import, this._getImport(params))
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
