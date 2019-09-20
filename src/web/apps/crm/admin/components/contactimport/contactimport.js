import { Attachments, Loader, Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Sources from './sources'
import Outlook from './outlook'
import Google from './google'
import React from 'react'
import New from './new'

class ContactImport extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    sources: PropTypes.array,
    status: PropTypes.string,
    onFetchProfiles: PropTypes.func
  }

  static defaultProps = {}

  state = {
    cards: []
  }

  _handleFetchProfiles = this._handleFetchProfiles.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader />
    if(status !== 'loaded') return null
    return (
      <div className="contactimport">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetchProfiles()
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'loaded') {
      this._handlePush(Sources, this._getSources())
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getAttachments() {
    return {
      // allow: {
      //   content_types: ['application/vnd.google-apps.spreadsheet'],
      //   extensions: ['csv','tsv','xls','xlsx'],
      //   types: ['files']
      // },
      cancelText: <i className="fa fa-chevron-left" />,
      onCancel: this._handlePop
    }
  }

  _getNew() {
    return {
      onPop: this._handlePop
    }
  }

  _getServiceComponent(service) {
    if(service === 'googlecontacts') return Google
    if(service === 'outlookcontacts') return Outlook
  }

  _getSources() {
    const { sources } = this.props
    return {
      sources: [
        { label: 'Your Device', service: 'device', component: <div>Foo</div> },
        { label: 'Excel or CSV file', service: 'excel', component: () => <Attachments {...this._getAttachments() } /> },
        ...sources.map(source => ({
          ...source,
          component: this._getServiceComponent(source.service)
        })),
        { label: 'Add a source', icon: 'plus-circle', component: () => <New { ...this._getNew() } /> }
      ],
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleFetchProfiles() {
    this.props.onFetchProfiles()
  }

  _handleJoin() {
    const { network } = this.context
    const channel = '/admin/account/profiles'
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetchProfiles }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = '/admin/account/profiles'
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetchProfiles }
    ])
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

}

export default ContactImport
