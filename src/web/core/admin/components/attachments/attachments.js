import { connect } from 'react-redux'
import Stack from '../stack/stack'
import Uploader from '../uploader'
import PropTypes from 'prop-types'
import Sources from './sources'
import Loader from '../loader'
import Device from './device'
import Photos from './photos'
import Review from './review'
import Files from './files'
import Drive from './drive'
import React from 'react'
import Url from './url'
import _ from 'lodash'

class Attachments extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    apps: PropTypes.array,
    assets: PropTypes.array,
    cancelText: PropTypes.any,
    cards: PropTypes.array,
    counts: PropTypes.object,
    doneText: PropTypes.string,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    networks: PropTypes.array,
    prompt: PropTypes.string,
    review: PropTypes.bool,
    sources: PropTypes.array,
    status: PropTypes.string,
    onAddAsset: PropTypes.func,
    onAddFile: PropTypes.func,
    onCancel: PropTypes.func,
    onChooseAssets: PropTypes.func,
    onCreate: PropTypes.func,
    onFetchProfiles: PropTypes.func,
    onDone: PropTypes.func,
    onRemove: PropTypes.func,
    onSetSources: PropTypes.func,
    onToggleReview: PropTypes.func
  }

  static defaultProps = {
    cancelText: 'Cancel',
    doneText: 'Done',
    multiple: false,
    networks: ['device','web','maha','google','facebook','instagram','dropbox','box','microsoft'],
    prompt: 'Attach Files',
    onChooseAssets: () => {}
  }

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFetchProfiles = this._handleFetchProfiles.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleToggleReview = this._handleToggleReview.bind(this)
  _handleReview = this._handleReview.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader />
    if(status !== 'loaded') return null
    return (
      <Uploader>
        <Stack { ...this._getStack() } />
      </Uploader>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetchProfiles()
  }

  componentDidUpdate(prevProps) {
    const { multiple, files, status } = this.props
    if(status !== prevProps.status && status === 'loaded') {
      this._handlePush(Sources, this._getSources())
    }
    if(!multiple && files.length !== prevProps.files.length && files.length === 1) {
      this._handleReview()
    }
    // const { files, multiple, status } = this.props
    // if( !multiple && _.get(files, '[0].id', false) && status === 'success' ){
    //   this._handleDone()
    // }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getReview() {
    const { doneText, multiple, onRemove } = this.props
    return {
      doneText,
      multiple,
      onBack: this._handlePop,
      onDone: this._handleDone,
      onRemove
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getSourceComponent(service) {
    if(_.includes(['facebook','instagram','googlephotos'], service)) return Photos
    return Files
  }

  _getSources() {
    const { multiple, onAddAsset, onAddFile, onCreate, onRemove } = this.props
    const { counts, cancelText, doneText, sources } = this.props
    return {
      multiple,
      counts,
      cancelText,
      doneText,
      sources: [
        { service: 'device', username: 'Your Device', component: Device },
        { service: 'web', username: 'The Web', component: Url },
        { service: 'maha', username: 'Maha Drive', component: Drive },
        ...sources.map(source => ({
          ...source,
          component: this._getSourceComponent(source.service)
        }))
      ],
      onAddAsset,
      onAddFile,
      onCreate,
      onRemove,
      onCancel: this._handleCancel,
      onNext: this._handleReview,
      onBack: this._handlePop,
      onPush: this._handlePush
    }
  }

  _handleCancel() {
    const { onCancel } = this.props
    if(onCancel) return onCancel()
    this.context.modal.pop()
  }

  _handleDone() {
    const { assets, multiple, onChooseAssets, onDone } = this.props
    const result = (multiple) ? assets : assets[0]
    onChooseAssets(result)
    if(onDone) return onDone()
    this.context.modal.pop()
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

  _handleReview() {
    this._handlePush(Review, this._getReview())
  }

  _handleToggleReview() {
    this.props.onToggleReview()
  }


}

const mapStateToProps = (state, props) => ({
  apps: state.maha.admin.apps
})

export default connect(mapStateToProps)(Attachments)
