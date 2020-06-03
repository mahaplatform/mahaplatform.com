import { Error } from 'maha-admin'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Articles from './articles'
import Article from './article'
import React from 'react'

class Help extends React.Component {

  static childContextTypes = {
    help: PropTypes.object
  }

  static propTypes = {
    articles: PropTypes.array,
    article: PropTypes.object,
    children: PropTypes.any,
    items: PropTypes.array,
    q: PropTypes.string,
    onClose: PropTypes.func,
    onDone: PropTypes.func,
    onFetch: PropTypes.func,
    onType: PropTypes.func
  }

  state = {
    open: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { open } = this.state
    return (
      <div className="maha-help">
        <div className="maha-help-main">
          { this.props.children }
        </div>
        { open &&
          <div className="maha-help-sidebar">
            <Error>
              <Stack { ...this._getStack() } />
            </Error>
          </div>
        }
      </div>
    )
  }

  getChildContext() {
    return {
      help: {
        toggle: this._handleToggle
      }
    }
  }

  _getArticle(article) {
    const { onClose } = this.props
    return {
      article,
      onDone: onClose
    }
  }

  _getStack() {
    const { articles } = this.props
    return {
      cards: [
        { component: Articles, props: this.props },
        ...articles.map(article => (
          { component: Article, props: this._getArticle(article) }
        ))
      ]
    }
  }

  _handleToggle() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

}

export default Help
