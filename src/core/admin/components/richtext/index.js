import ReactHtmlParser from 'react-html-parser'
import emojify from '../emojis/emojify'
import PropTypes from 'prop-types'
import React from 'react'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

const URL_REGEX = /((http[s]?|ftp):\/)?\/?([^:/\s]+)((\/\w+)*\/)([\w\-.]+[^#?\s]+)([^\s]*)?(#[\w-]+)?/g

class RichText extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    text: PropTypes.string
  }

  _handleLocalLink = this._handleLocalLink.bind(this)

  render() {
    const { text } = this.props
    if(!text) return ''
    const transforms = [
      { regex: /&/g, replacement: '&amp;' },
      { regex: /</g, replacement: '&lt;' },
      { regex: />/g, replacement: '&gt;' },
      { regex: /"/g, replacement: '&quot;' },
      { regex: /\n/g, replacement: '<br />' },
      { regex: URL_REGEX, replacement: '<a href="$&">$&</a>' },
      { regex: /```\n?([^`]*)```/mg, replacement: '<div class="maha-richtext-code">$1</div>' },
      { regex: /`([^`]+)`/g, replacement: '<span class="maha-richtext-snippet">$1</span>' },
      { regex: /\*([\w\s]+)\*/g, replacement: '<b>$1</b>' },
      { regex: /_([\w\s]+)_/g, replacement: '<u>$1</u>' },
      { regex: /~([\w\s]+)~/g, replacement: '<strike>$1</strike>' },
      { regex: /^>(.*)$/g, replacement: '<blockquote>$1</blockquote>' }
    ]
    const transformed = transforms.reduce((html, transform) => {
      return html.replace(transform.regex, transform.replacement)
    }, text)
    const html = emojify(transformed)
    if(html.length === 0 || html === ' ') return null
    const transform = (node, index) => {
      if (node.type === 'tag' && node.name === 'a') {
        const href = node.attribs.href
        if(!href.startsWith(process.env.WEB_HOST)) {
          return <a key={`node_${index}`} href={ href } rel="noopener noreferrer" target="_blank">{ href }</a>
        } else {
          return (
            <div key={`node_${index}`} className="maha-richtext-link" onClick={ this._handleLocalLink.bind(this, href) }>
              { href }
            </div>
          )
        }
      }
    }
    return <div className="maha-richtext">
      { ReactHtmlParser(html, { transform }) }
    </div>
  }

  _handleLocalLink(link) {
    const url = new URL(link)
    this.context.router.history.push(url.pathname+url.search+url.hash)
  }

}

export default RichText
