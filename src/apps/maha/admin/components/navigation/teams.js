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
            Teams
          </div>
          <div className="maha-navigation-header-next">
            <i className="fa fa-chevron-down" />
          </div>
        </div>
        <div className="maha-navigation-body">
          <div className="maha-navigation-accounts">
            { teams.map((team, index) => (
              <div key={`team_${index}`} className="maha-navigation-account" onClick={ this._handleChangeTeam.bind(this, index) }>
                <div className="maha-navigation-account-logo">
                  <Logo team={ team } width="50" />
                </div>
                <div className="maha-navigation-account-title">
                  { team.title }
                </div>
                <div className="maha-navigation-account-active">
                  { index === active && <i className="fa fa-check" /> }
                </div>
              </div>
            ))}
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

}

export default Teams
