import { Loader, Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Sources from './sources'
import Outlook from './outlook'
import Google from './google'
import React from 'react'
import New from './new'

class ContactImport extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    sources: PropTypes.array,
    status: PropTypes.string,
    onFetchProfiles: PropTypes.func
  }

  static defaultProps = {}

  state = {
    cards: []
  }

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
    this.props.onFetchProfiles()
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'loaded') {
      this._handlePush(Sources, this._getSources())
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
        { label: 'Excel or CSV file', service: 'excel', component: <div>Foo</div> },
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
