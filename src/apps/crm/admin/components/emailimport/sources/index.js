import { Loader, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Gmail from './gmail'
import React from 'react'
import New from './new'

class Sources extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
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
  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(this.state.sources === null) return <Loader />
    const sources = this._getSources()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="emailimport-sources">
          { sources.map((source, index) => (
            <div className="emailimport-source" key={`source_${index}`} onClick={ this._handleClick.bind(this, source) }>
              <div className="emailimport-source-service">
                { (source.service || source.image) &&
                  <img src={`/admin/images/services/${source.service || source.image}.png`} />
                }
                { source.icon &&
                  <i className={`fa fa-${source.icon}`} />
                }
              </div>
              <div className="emailimport-source-label">
                { source.username ?
                  <span>{ source.label } ({ source.username })</span> :
                  <span>{ source.label }</span>
                }
              </div>
              <div className="emailimport-source-proceed">
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

  _getPanel() {
    return {
      title: 'Choose Email Source',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getService(service) {
    if(service === 'gmail') return { component: Gmail, label: 'GMail' }
    if(service === 'outlook') return { component: <div>outlook</div>, label: 'Outlook 365' }
  }

  _getSources() {
    const { sources } = this.state
    return [
      ...sources.map(source => ({
        ...source,
        ...this._getService(source.service)
      })),
      { label: 'Add a source', icon: 'plus-circle', component: <New { ...this._getNew() } /> }
    ]
  }

  _getSource(source) {
    const { contact, onPop, onPush } = this.props
    return {
      contact,
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

  _handleFetch() {
    this.context.network.request({
      method: 'get',
      endpoint: '/api/admin/profiles',
      query: {
        $filter: {
          type: {
            $in: ['emails']
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
