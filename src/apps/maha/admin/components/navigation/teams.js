import { Avatar, Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Teams extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    teams: PropTypes.array,
    team: PropTypes.object,
    onDone: PropTypes.func,
    onReset: PropTypes.func,
    onToggleMode: PropTypes.func
  }

  _handleAddTeam = this._handleAddTeam.bind(this)
  _handleToggleMode = this._handleToggleMode.bind(this)

  render() {
    const { active, teams, team } = this.props
    return (
      <div className="maha-navigation-panel">
        <div className="maha-navigation-header" onClick={ this._handleToggleMode }>
          <div className="maha-navigation-header-back">
            <Logo team={ team } width="50" />
          </div>
          <div className="maha-navigation-header-team">
            Accounts
          </div>
          <div className="maha-navigation-header-next">
            <i className="chevron down icon" />
          </div>
        </div>
        <div className="maha-navigation-body">
          <div className="maha-navigation-accounts">
            { teams.map((team, index) => {
              if(!team.token) return null
              return (
                <div key={`team_${index}`} className="maha-navigation-account" onClick={ this._handleChangeTeam.bind(this, index) }>
                  <div className="maha-navigation-account-logo">
                    <Logo team={ team } width="32" />
                    <Avatar user={ team.user } width="16" presence={ false } />
                  </div>
                  <div className="maha-navigation-account-title">
                    <strong>{ team.user.full_name }</strong><br />
                    { team.title }
                  </div>
                  <div className="maha-navigation-account-active">
                    { index === active && <i className="green check icon" /> }
                  </div>
                </div>
              )
            })}
          </div>
          <div className="maha-navigation-account-add" onClick={ this._handleAddTeam }>
            <div className="maha-navigation-account-add-button">
              <div className="maha-navigation-account-add-button-image">
                <i className="icon plus" />
              </div>
            </div>
            <div className="maha-navigation-account-add-text">
              Add account
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleToggleMode() {
    this.props.onToggleMode()
  }

  _handleChangeTeam(index) {
    const { active, onDone } = this.props
    const { chooseTeam } = this.context.admin
    if(index === active) onDone()
    if(index !== active) chooseTeam(index)

  }

  _handleAddTeam() {
    const { router } = this.context
    const { onDone } = this.props
    onDone()
    router.history.push('/admin/signin')
  }

}

export default Teams
