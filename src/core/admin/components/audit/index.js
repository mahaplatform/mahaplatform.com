import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Avatar from '../avatar'
import Button from '../button'
import moment from 'moment'
import React from 'react'

class Audit extends React.Component {

  static propTypes = {
    compact: PropTypes.bool,
    entries: PropTypes.array
  }

  static defaultProps = {
    compact: false
  }

  state = {
    showall: false
  }

  _handleShowAll = this._handleShowAll.bind(this)

  render() {
    const shown = this._getEntries()
    const { entries } = this.props
    const { showall } = this.state
    if(entries.length === 0) return null
    return (
      <div className={ this._getClass() }>
        { entries.length > 5 && !showall &&
          <div className="maha-audit-more">
            <Button { ...this._getShowAll() } />
          </div>
        }
        { shown.map((entry, index) => (
          <div className="maha-audit-entry" key={`entry_${entry.id}`}>
            <div className="maha-audit-entry-avatar">
              <Avatar user={ this._getSubject(entry) } width="16" height="16" presence={ false } />
            </div>
            <div className="maha-audit-entry-details">
              <div className="maha-audit-entry-text">
                { entry.story }
                { ` by ${this._getSubject(entry).full_name}` }
              </div>
              <div className="maha-audit-entry-timestamp">
                { moment(entry.created_at).format('MM/DD/YY @ h:mm A') }
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass() {
    const { compact } = this.props
    const classes = ['maha-audit']
    if(compact) classes.push('compact')
    return classes.join(' ')
  }

  _getEntries() {
    const { showall } = this.state
    const { entries } = this.props
    return showall ? entries : entries.slice(-5)
  }

  _getShowAll() {
    const { entries } = this.props
    const remaining = entries.length - 5
    return {
      label: `Show ${pluralize('more entry', remaining, true)} `,
      className: 'tiny link',
      handler: this._handleShowAll
    }
  }

  _getActor(entry) {
    if(entry.contact || entry.user) return entry
    return { user: { full_name: 'Maha',  photo: '/images/maha.png' } }
  }

  _getSubject(entry) {
    const actor = this._getActor(entry)
    if(actor.user) return actor.user
    if(actor.contact) return actor.contact
  }

  _handleShowAll() {
    this.setState({
      showall: true
    })
  }

}

export default Audit
