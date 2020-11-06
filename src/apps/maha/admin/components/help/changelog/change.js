import { Button } from '@admin'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import React from 'react'

class Change extends React.Component {

  static propTypes = {
    change: PropTypes.string
  }

  render() {
    const { change } = this.props
    return (
      <li className="maha-help-changelog-change">
        { ReactHtmlParser(change, this._getBody()) }
      </li>
    )
  }

  _getBody() {
    return {
      transform: (node, index) => {
        const matches = node.data.trim().match(/^(\[(.*)\])\s(.*?)(\s\((MHD-\d{3,4})\))?$/)
        if(!matches) return ''
        const [,,label,message,,ticket] = matches
        return (
          <div key={`change_${index}`}>
            <span className={`label ${label.toLowerCase()}`}>{label}</span>
            { message }
            { ticket &&
              <span> (<Button { ...this._getTicket(ticket) } />)</span>
            }
          </div>
        )
      }
    }
  }

  _getTicket(ticket) {
    return {
      label: ticket,
      className: 'link',
      link: `https://mahaplatform.atlassian.net/browse/${ticket}`
    }
  }

}

export default Change
