import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Accounts extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    host: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    removing: PropTypes.bool,
    signin_id: PropTypes.string,
    status: PropTypes.string,
    teams: PropTypes.array,
    user: PropTypes.object,
    onChangeMode: PropTypes.func,
    onEmail: PropTypes.func,
    onSet: PropTypes.func,
    onToggleRemove: PropTypes.func
  }

  _handleNew = this._handleNew.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleToggleRemove = this._handleToggleRemove.bind(this)

  render() {
    const { active, removing, teams } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-accounts">
          <div className="maha-signin-accounts-list">
            <div className="maha-signin-accounts-title">
              <h2>The Maha Platform</h2>
              <p>Choose an account</p>
            </div>
            { teams.map((team, index) => (
              <div key={`account_${team.user.id}`} className="maha-signin-account" onClick={ this._handleClick.bind(this, index) } >
                <div className="maha-signin-account-avatar">
                  <Avatar user={ team.user } presence={ false } />
                </div>
                <div className="maha-signin-account-details">
                  <strong>{ team.user.full_name }</strong><br />
                  { team.title}<br />
                  { !team.token && <em>Signed Out</em> }
                </div>
                <div className="maha-signin-account-extra">
                  { removing &&
                    <i className="fa fa-fw fa-times" />
                  }
                  { !removing && index === active &&
                    <i className="fa fa-fw fa-check" />
                  }
                </div>
              </div>
            ))}
            <div className="maha-signin-account">
              <div className="maha-signin-account-avatar">
                <div className="maha-avatar">
                  <div className="maha-avatar-badge">
                    <div className="maha-avatar-wrapper">
                      <i className="fa fa-fw fa-plus" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="maha-signin-account-details" onClick={ this._handleNew }>
                { teams.length > 1 ? 'Sign in to another account' : 'Sign in to an account' }
              </div>
            </div>
            <div className={ this._getRemoveClass() } onClick={ this._handleToggleRemove }>
              { removing ? 'Done' : 'Remove an account' }
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getRemoveClass() {
    const { teams } = this.props
    const classes = ['maha-signin-accounts-remove']
    if(teams.length === 0) classes.push('disabled')
    return classes.join(' ')
  }

  componentDidMount() {
    this.props.onSet(null, null, 'accounts')
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'success') this._handleNext()
  }

  _getNextMode() {
    const { user } = this.props
    if(user.is_blocked) return 'blocked'
    if(user.locked_out_at && moment().diff(moment(user.locked_out_at), 'seconds') < 60 * 5) return 'lockout'
    return 'password'
  }

  _handleClick(index) {
    return this.props.removing ? this._handleRemove(index) : this._handleChoose(index)
  }

  _handleRemove(index) {
    const { admin } = this.context
    const { teams, onToggleRemove } = this.props
    if(teams.length === 1) onToggleRemove()
    admin.removeTeam(index)
  }

  _handleChoose(index) {
    const { admin } = this.context
    const { signin_id, teams, onChangeMode, onEmail } = this.props
    if(teams[index].token) return admin.chooseTeam(index)
    const team = _.omit(teams[index], ['token'])
    const user = teams[index].user
    if(team.authentication_strategy === 'local') {
      onEmail(team.id, user.email)
    } else {
      const state = btoa(JSON.stringify({ signin_id, team_id: team.id }))
      this.context.host.signin(`/admin/auth/${team.authentication_strategy}?state=${state}`)
      // setTimeout(() => onChangeMode('wait'), 250)
    }
  }

  _handleNew() {
    this.props.onChangeMode('team')
  }

  _handleNext() {
    const mode = this._getNextMode()
    this.props.onChangeMode(mode)

  }

  _handleToggleRemove() {
    if(this.props.teams.length === 0) return
    this.props.onToggleRemove()
  }

}

export default Accounts
