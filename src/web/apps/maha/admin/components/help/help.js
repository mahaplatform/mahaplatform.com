import { Message, ModalPanel } from 'maha-admin'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Article from './article'
import Search from './search'
import React from 'react'

class Help extends React.Component {

  static contextTypes = {
    logger: PropTypes.object
  }

  static propTypes = {
    articles: PropTypes.array,
    article: PropTypes.object,
    items: PropTypes.array,
    q: PropTypes.string,
    onClose: PropTypes.func,
    onDone: PropTypes.func,
    onFetch: PropTypes.func,
    onType: PropTypes.func
  }

  static getDerivedStateFromError(error) {
    return { error: true }
  }

  state = {
    error: false
  }

  _handleDone = this._handleDone.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { error } = this.state
    if(error) return this.renderError()
    return (
      <div className="maha-help">
        <ModalPanel { ...this._getPanel() }>
          <div className="maha-help-main">
            <Search { ...this._getSearch() } />
          </div>
        </ModalPanel>
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  renderError() {
    return (
      <ModalPanel { ...this._getErrorPanel() }>
        <Message { ...this._getError() } />
      </ModalPanel>
    )
  }

  componentDidCatch(error, info) {
    this.context.logger.error(error, info)
  }

  _getArticle(article) {
    const { onClose } = this.props
    return {
      article,
      onDone: onClose
    }
  }

  _getErrorPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'Error'
    }
  }

  _getError() {
    return {
      icon: 'exclamation-triangle',
      title: 'Error',
      text: 'There was a problem'
    }
  }

  _getPanel() {
    return {
      title: 'Help Center',
      color: 'green',
      leftItems: [
        { icon: 'remove', handler: this._handleDone }
      ]
    }
  }

  _getSearch() {
    return {
      q: this.props.q,
      onClick: this._handleFetch,
      onType: this._handleType
    }
  }

  _getStack() {
    const { articles } = this.props
    return {
      cards: articles.map(article => ({
        component: ()=> <Article { ...this._getArticle(article) }/>
      }))
    }
  }

  _handleType(q) {
    this.props.onType(q)
  }

  _handleFetch(id) {
    this.props.onFetch(id)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Help
