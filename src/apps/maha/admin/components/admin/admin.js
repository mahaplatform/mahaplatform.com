import PropTypes from 'prop-types'
import Router from './router'
import Inner from './inner'
import React from 'react'

class Admin extends React.Component {

  static childContextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    account_status: PropTypes.string,
    active: PropTypes.number,
    apps: PropTypes.array,
    children: PropTypes.any,
    redirect: PropTypes.any,
    rights: PropTypes.array,
    status: PropTypes.string,
    teams: PropTypes.array,
    teams_status: PropTypes.string,
    team: PropTypes.object,
    user: PropTypes.object,
    onChooseTeam: PropTypes.func,
    onLoadAccount: PropTypes.func,
    onFetchAccount: PropTypes.func,
    onFetchSession: PropTypes.func,
    onFetchTeams: PropTypes.func,
    onSaveAccount: PropTypes.func,
    onSignin: PropTypes.func,
    onSignout: PropTypes.func,
    onSetRedirect: PropTypes.func
  }

  _handleChooseTeam = this._handleChooseTeam.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleSignout = this._handleSignout.bind(this)

  render() {
    return (
      <Router { ...this._getRouter() }>
        <Inner { ...this._getInner() }>
          { this.props.children }
        </Inner>
      </Router>
    )
  }

  _getRouter() {
    const { apps, team, teams } = this.props
    return {
      apps,
      team,
      teams
    }
  }

  _getInner() {
    return this.props
  }

  getChildContext() {
    const { account, apps, rights, team, teams, user } = this.props
    return {
      admin: {
        account,
        apps,
        rights,
        team,
        teams,
        user,
        chooseTeam: this._handleChooseTeam,
        signin: this._handleSignin,
        signout: this._handleSignout
      }
    }
  }

  _handleChooseTeam(active = 0, redirect = null) {
    this.props.onChooseTeam(active, redirect)
  }

  _handleSignin(account, active) {
    this.props.onSignin(account, active)
  }

  _handleSignout() {
    this.props.onSignout()
  }

}

export default Admin
