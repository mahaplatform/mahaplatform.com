import { Error } from 'maha-admin'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Article from './article'
import React from 'react'
import List from './list'

class Help extends React.Component {

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

  render() {
    return (
      <div className="maha-help">
        <Error>
          <Stack { ...this._getStack() } />
        </Error>
      </div>
    )
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
        { component: List, props: this.props },
        ...articles.map(article => (
          { component: Article, props: this._getArticle(article) }
        ))
      ]
    }
  }

}

export default Help
