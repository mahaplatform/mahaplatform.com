import Uploader from './device/uploader'
import { connect } from 'react-redux'
import Importing from './importing'
import PropTypes from 'prop-types'
import Explorer from './explorer'
import Loader from '../loader'
import Stack from '../stack'
import React from 'react'
import _ from 'lodash'

class Attachments extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    allow: PropTypes.object,
    apps: PropTypes.array,
    assets: PropTypes.array,
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    processed: PropTypes.bool,
    prompt: PropTypes.string,
    retry: PropTypes.string,
    sources: PropTypes.array,
    status: PropTypes.string,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onChooseAssets: PropTypes.func,
    onCreate: PropTypes.func,
    onFetch: PropTypes.func,
    onDone: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    allow: {},
    cancelText: 'Cancel',
    multiple: false,
    prompt: 'Attach Files',
    onChooseAssets: () => {}
  }

  state = {
    cards: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleImporting = this._handleImporting.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader />
    if(status !== 'loaded') return null
    return (
      <Uploader { ... this._getUploader() }>
        <Stack { ...this._getStack() } />
      </Uploader>
    )


  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { multiple, files } = this.props
    if(!multiple && !_.isEqual(files, prevProps.files) && files.length === 1 && files[0].status === 'importing') {
      this._handleImporting()
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getExplorer() {
    const { allow, cancelText, multiple } = this.props
    return {
      allow,
      cancelText,
      multiple,
      onAdd: this._handleAdd,
      onCancel: this._handleCancel,
      onNext: this._handleImporting,
      onRemove: this._handleRemove
    }
  }

  _getImporting() {
    const { multiple, onCreate } = this.props
    return {
      multiple,
      onDone: this._handleDone,
      onCreate
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards: [
        { component: Explorer, props: this._getExplorer() },
        ...cards
      ],
      slideFirst: false
    }
  }

  _getUploader() {
    const { allow, multiple, onUpdate } = this.props
    return {
      allow,
      multiple,
      onAdd: this._handleAdd,
      onUpdate
    }
  }

  _handleAdd(file) {
    const { multiple, files } = this.props
    const index = _.findIndex(files, { id: file.id, service: file.service })
    if(index >= 0) return
    if(!multiple) this.props.onRemove(0)
    this.props.onAdd(file)
  }

  _handleCancel() {
    const { onCancel } = this.props
    if(onCancel) return onCancel()
    this.context.modal.pop()
  }

  _handleDone() {
    const { assets, multiple, onChooseAssets, onDone } = this.props
    onChooseAssets(assets)
    if(!multiple) setTimeout(this._handlePop, 250)
    if(onDone) return onDone(assets)
    this.context.modal.pop()
  }

  _handleFetch() {
    const { allow } = this.props
    const types = allow.types || ['files','photos']
    this.props.onFetch(types)
  }

  _handleImporting() {
    const { processed } = this.props
    if(processed) return this._handleDone()
    this._handlePush(Importing, this._getImporting())
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

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

const mapStateToProps = (state, props) => ({
  apps: state.maha.admin.apps
})

export default connect(mapStateToProps)(Attachments)
