import { Infinite, Message, Searchbox } from 'maha-admin'
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
    const { q } = this.props
    const empty = {
      icon: 'times',
      title: 'No Articles',
      text: 'There were no articles that matched your search'
    }
    return {
      endpoint: '/api/admin/help',
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      filter: { q },
      layout: (props) => <Results { ...props } { ...this._getResults() } />
    }
  }

  _getResults() {
    const { onClick } = this.props
    return {
      onClick
    }
  }

  _handleType(q) {
    this.props.onType(q)
  }

}

export default Search
