import { Infinite, Message, Searchbox } from '@admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Search extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    q: PropTypes.string,
    onClick: PropTypes.func,
    onType: PropTypes.func
  }

  render() {
    return (
      <div className="maha-help-search">
        <div className="maha-help-search-query">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <Infinite { ...this._getInfinite() } />
      </div>
    )
  }

  _getSearchbox() {
    return {
      prompt: 'Find an article...',
      onChange: this._handleType.bind(this)
    }
  }

  _getInfinite() {
    const { q, onClick } = this.props
    const empty = {
      icon: 'times',
      title: 'No Articles',
      text: 'There were no articles that matched your search'
    }
    return {
      endpoint: '/api/admin/help/articles',
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      filter: { q },
      layout: Results,
      props: {
        onClick
      }
    }
  }

  _handleType(q) {
    this.props.onType(q)
  }

}

export default Search
