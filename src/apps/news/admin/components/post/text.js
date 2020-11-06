import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    text: PropTypes.string
  }

  state = {
    expanded: false
  }

  _handleShowMore = this._handleShowMore.bind(this)

  render() {
    const { expanded } = this.state
    const text = this._getText()
    return (
      <div className="news-post-body">
        <span dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
        { !expanded &&
          <span>
            ... <Button { ...this._getButton() } />
          </span>
        }
      </div>
    )
  }

  componentDidMount() {
    const { text } = this.props
    const words = text.split(' ')
    if(words.length <= 84) {
      this.setState({
        expanded: true
      })
    }
  }

  _getText() {
    const { expanded } = this.state
    const { text } = this.props
    if(expanded) return text
    return text.split(' ').slice(0, 84).join(' ')
  }

  _getButton() {
    return {
      label: 'See More',
      className: 'link',
      handler: this._handleShowMore
    }
  }

  _handleShowMore() {
    this.setState({
      expanded: true
    })
  }

}

export default Text
