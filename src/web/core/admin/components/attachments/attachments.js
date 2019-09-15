import { CSSTransition } from 'react-transition-group'
import Instagram from './networks/instagram'
import Microsoft from './networks/microsoft'
import Facebook from './networks/facebook'
import Dropbox from './networks/dropbox'
import Google from './networks/google'
import { connect } from 'react-redux'
import AssetIcon from '../asset/icon'
import Stack from '../stack/stack'
import Uploader from '../uploader'
import PropTypes from 'prop-types'
import Box from './networks/box'
import Sources from './sources'
import Loader from '../loader'
import Device from './device'
import Drive from './drive'
import React from 'react'
import Url from './url'

class Attachments extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    apps: PropTypes.array,
    assets: PropTypes.array,
    active: PropTypes.number,
    cancelText: PropTypes.any,
    cards: PropTypes.array,
    counts: PropTypes.object,
    doneText: PropTypes.string,
    files: PropTypes.array,
    images: PropTypes.array,
    isReady: PropTypes.bool,
    multiple: PropTypes.bool,
    networks: PropTypes.array,
    plains: PropTypes.array,
    prompt: PropTypes.string,
    sources: PropTypes.array,
    status: PropTypes.string,
    onAddAsset: PropTypes.func,
    onAddFile: PropTypes.func,
    onCancel: PropTypes.func,
    onChooseAssets: PropTypes.func,
    onChooseSource: PropTypes.func,
    onCreate: PropTypes.func,
    onFetchProfiles: PropTypes.func,
    onDone: PropTypes.func,
    onRemoveAsset: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onSetSources: PropTypes.func
  }

  static defaultProps = {
    cancelText: 'Cancel',
    doneText: 'Done',
    multiple: true,
    networks: ['device','web','maha','google','facebook','instagram','dropbox','box','microsoft'],
    prompt: 'Attach Files',
    onChooseAssets: () => {}
  }

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleChooseSource = this._handleChooseSource.bind(this)
  _handleFetchProfiles = this._handleFetchProfiles.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)

  render() {
    const { files, images, plains, status } = this.props
    if(status === 'loading') return <Loader />
    if(status !== 'loaded') return null
    return (
      <div className="maha-attachments">
        <Uploader>
          <Stack cards={ this._getCards() } />
        </Uploader>
        <CSSTransition in={ files.length > 0 } classNames="expanded" timeout={ 150 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-attachments-summary">
            { images.length > 0 &&
             <div className="maha-attachments-summary-images">
               { images.map((file, index) => (
                 <div className="maha-attachments-summary-image" key={`image_${index}`}>
                   <div style={{backgroundImage:`url(${file.thumbnail })`}}>
                     { file.asset ?
                       <i className="fa fa-times" onClick={ this._handleRemoveFile.bind(this, file) } /> :
                       <i className="fa fa-spin fa-circle-o-notch" />
                     }
                     <img src={ `/admin/images/${file.network}.png` } />
                   </div>
                 </div>
               )) }
             </div>
            }
            { plains.length > 0 &&
             <div className="maha-attachments-summary-plains">
               { plains.map((file, index) => (
                 <div className="maha-attachments-summary-item" key={`plain_${index}`}>
                   <div className="maha-attachments-summary-item-icon">
                     <AssetIcon content_type={ file.content_type } />
                   </div>
                   <div className="maha-attachments-summary-item-name">
                     { file.name }
                   </div>
                   <div className="maha-attachments-summary-item-remove">
                     { file.asset ?
                       <i className="fa fa-times" onClick={ this._handleRemoveFile.bind(this, file) } /> :
                       <i className="fa fa-spin fa-circle-o-notch" />
                     }
                   </div>
                 </div>
               )) }
             </div>
            }
          </div>
        </CSSTransition>
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
      this.setState({
        cards: [
          { component: Sources, props: this._getSources() }
        ]
      })
    }
    // const { files, multiple, status } = this.props
    // if( !multiple && _.get(files, '[0].id', false) && status === 'success' ){
    //   this._handleDone()
    // }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getCards() {
    // const { active, sources } = this.props
    // const cards = [
    //   { component: () => <Sources { ...this._getSources() } /> }
    // ]
    // if(active !== null) {
    //   const source = sources[active]
    //   console.log(source)
    //   cards.push({ component: source.component, props: this._getSource(source) })
    // }
    return this.state.cards
  }

  _getSourceComponent(source) {
    if(source.network === 'google') return Google
    if(source.network === 'facebook') return Facebook
    if(source.network === 'instagram') return Instagram
    if(source.network === 'dropbox') return Dropbox
    if(source.network === 'box') return Box
    if(source.network === 'microsoft') return Microsoft
  }

  _getSources() {
    const { active, cancelText, counts, doneText, sources } = this.props
    return {
      active,
      cancelText,
      counts,
      doneText,
      sources: [
        { network: 'device', username: 'Your Device', component: Device },
        { network: 'web', username: 'The Web', component: Url },
        { network: 'maha', username: 'Maha Drive', component: Drive },
        ...sources.map(source => ({
          network: source.network,
          username: source.username,
          photo: source.photo,
          component: this._getSourceComponent(source.network),
          endpoint: `/api/admin/profiles/${source.id}/files`
        }))
      ],
      onCancel: this._handleCancel,
      onDone: this._handleDone,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getSource(source) {
    const { files, isReady, multiple, onAddAsset, onAddFile, onCreate, onRemoveFile } = this.props
    return {
      source,
      files,
      isReady,
      multiple,
      onAddAsset,
      onAddFile,
      onCreate,
      onRemoveFile,
      onBack: this._handleChooseSource,
      onDone: this._handleDone
    }
  }

  _getSourceClass(index) {
    const { active } = this.props
    const classes = ['maha-attachments-source']
    if(index === active) classes.push('active')
    return classes.join(' ')
  }

  _handleCancel() {
    const { onCancel } = this.props
    if(onCancel) return onCancel()
    this.context.modal.pop()
  }

  _handleChooseSource(index) {
    this.props.onChooseSource(index)
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

  _handleRemoveFile(file) {
    this.props.onRemoveFile(file)
  }

}

const mapStateToProps = (state, props) => ({
  apps: state.maha.admin.apps
})

export default connect(mapStateToProps)(Attachments)
