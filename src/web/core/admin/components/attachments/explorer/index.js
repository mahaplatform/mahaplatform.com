import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { counts } from '../selectors'
import Stack from '../../stack/stack'
import PropTypes from 'prop-types'
import Sources from '../sources'
import Device from '../device'
import Photos from '../photos'
import Review from './review'
import Files from '../files'
import Drive from '../drive'
import React from 'react'
import Web from '../web'
import _ from 'lodash'

class Explorer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    doneText: PropTypes.string,
    extensions: PropTypes.array,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    sources: PropTypes.array,
    types: PropTypes.array,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onCreate: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func
  }

  state = {
    cards: [],
    review: false
  }

  _handleNext = this._handleNext.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleToggleReview = this._handleToggleReview.bind(this)

  render() {
    const { review } = this.state
    const { files } = this.props
    return (
      <div className="maha-attachments-explorer">
        <Stack { ...this._getStack() } />
        <CSSTransition in={ files.length > 0 } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-attachments-explorer-footer" onClick={ this._handleToggleReview }>
            { files.length } files selected
          </div>
        </CSSTransition>
        <CSSTransition in={ review } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <Review { ...this._getReview() } />
        </CSSTransition>
      </div>
    )
  }

  _getReview() {
    const { onRemove } = this.props
    return {
      onClose: this._handleToggleReview,
      onRemove
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards: [
        { component: Sources, props: this._getSources() },
        ...cards
      ],
      slideFirst: false
    }
  }

  _getSourceComponent(service) {
    if(_.includes(['facebook','instagram','googlephotos'], service)) return Photos
    return Files
  }

  _getSources() {
    const { counts, cancelText, extensions, multiple, sources, types, onAdd, onCancel, onCreate, onRemove } = this.props
    return {
      counts,
      cancelText,
      extensions,
      multiple,
      sources: [
        { service: 'device', username: 'Your Device', component: Device },
        { service: 'web', username: 'The Web', component: Web },
        { service: 'maha', username: 'Maha Drive', component: Drive },
        ...sources.map(source => ({
          ...source,
          component: this._getSourceComponent(source.service)
        }))
      ],
      types,
      onAdd,
      onBack: this._handlePop,
      onCancel,
      onCreate,
      onNext: this._handleNext,
      onPush: this._handlePush,
      onRemove
    }
  }

  _handleNext() {
    this.props.onNext()
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

  _handleToggleReview() {
    const { review } = this.state
    this.setState({
      review: !review
    })
  }

}

const mapStateToProps = (state, props) => ({
  counts: counts(state.maha.attachments, props),
  files: state.maha.attachments.files,
  sources: state.maha.attachments.sources
})

export default connect(mapStateToProps)(Explorer)
