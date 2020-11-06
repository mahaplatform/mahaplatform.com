import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Avatar } from '@admin'
import Badge from '../badge'
import React from 'react'
import _ from 'lodash'

class Ribbon extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    apps: PropTypes.array,
    active: PropTypes.number,
    badges: PropTypes.array,
    user: PropTypes.object,
    onChoose: PropTypes.func,
    onHelp: PropTypes.func,
    onSetMode: PropTypes.func
  }

  render() {
    const { badges, user } = this.props
    return (
      <div className="maha-ribbon">
        <div { ...this._getMenu() }>
          <i className="fa fa-fw fa-bars" />
        </div>
        <div className="maha-ribbon-spacer" />
        { badges.slice().map((badge, index) => ({
          ...badge,
          index
        })).filter((badge) => {
          return badge.app === 'maha' || this._getAccess(badge.app)
        }).sort((a,b) => {
          return (a.weight || 0) > (b.weight || 0) ? 1 : -1
        }).map((badge, index) => (
          <div key={`badge_${index}`} { ...this._getBadge(badge) }>
            { badge.component ? <badge.component /> : <Badge { ...badge } /> }
          </div>
        ))}
        <div { ...this._getAccount() }>
          <div className="maha-badge">
            <Avatar user={ user } width={ 28 } presence={ false } />
          </div>
        </div>
      </div>
    )
  }

  _getAccess(code) {
    return _.findIndex(this.props.apps, { code }) >= 0
  }

  _getAccount() {
    return {
      className: 'maha-ribbon-item',
      'data-tooltip': 'Account',
      'data-position': 'right center',
      'data-inverted': true,
      onClick:  this._handleMode.bind(this, 'account')
    }
  }

  _getBadge(badge) {
    return {
      className: this._getClass(badge.index),
      onClick:  this._handleChoose.bind(this, badge, badge.index),
      ...badge.tooltip ? {
        'data-tooltip': badge.tooltip,
        'data-position': 'right center',
        'data-inverted': true
      } : {}
    }
  }

  _getClass(index) {
    const { active } = this.props
    const classes = ['maha-ribbon-item']
    if(index === active) classes.push('active')
    return classes.join(' ')
  }

  _getMenu() {
    return {
      className: 'maha-ribbon-item',
      'data-tooltip': 'Apps',
      'data-position': 'right center',
      'data-inverted': true,
      onClick:  this._handleMode.bind(this, 'navigation')
    }
  }

  _handleChoose(item, index) {
    if(item.sidebar) this.props.onChoose(index)
  }

  _handleMode(mode) {
    this.props.onSetMode(mode)
  }

}

const mapStateToProps = (state, props) => ({
  apps: state.maha.admin.apps,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Ribbon)
