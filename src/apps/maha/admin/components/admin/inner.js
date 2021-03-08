import PropTypes from 'prop-types'
import { Loader } from '@admin'
import React from 'react'
import _ from 'lodash'

class Admin extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object,
    flash: PropTypes.object,
    logger: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    account_status: PropTypes.string,
    active: PropTypes.number,
    active_status: PropTypes.string,
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
    onLoadActive: PropTypes.func,
    onFetchAccount: PropTypes.func,
    onFetchSession: PropTypes.func,
    onFetchTeams: PropTypes.func,
    onSaveAccount: PropTypes.func,
    onSaveActive: PropTypes.func,
    onSignin: PropTypes.func,
    onSignout: PropTypes.func,
    onSetRedirect: PropTypes.func
  }

  _handleChooseTeam = this._handleChooseTeam.bind(this)
  _handleFetchSession = this._handleFetchSession.bind(this)
  _handleFetchAccount = this._handleFetchAccount.bind(this)
  _handleForceSignout = this._handleForceSignout.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleRedirectToSignin = this._handleRedirectToSignin.bind(this)
  _handleSaveAccount = this._handleSaveAccount.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader />
    return this.props.children
  }

  componentDidMount() {
    this._handleIntent()
    this._handleInit()
  }

  componentDidUpdate(prevProps) {
    const { active, active_status, account, account_status, teams_status, team, user } = this.props
    if(active_status !== prevProps.active_status && active_status === 'loaded') {
      return this.props.onLoadAccount()
    }
    if(account_status !== prevProps.account_status && account_status === 'loaded') {
      if(!account) return this._handleRedirectToSignin()
      return this._handleFetchAccount()
    }
    if(account_status !== prevProps.account_status && _.includes(['authenticated','pending','success'], account_status)) {
      this._handleSaveAccount()
    }
    if(account_status !== prevProps.account_status && _.includes(['authenticated','success'], account_status)) {
      return this._handleFetchTeams()
    }
    if(!_.isEqual(account, prevProps.account) && !account) {
      return this._handleRedirectToSignin()
    }
    if(teams_status !== prevProps.teams_status && teams_status === 'success') {
      return this._handleFetchSession()
    }
    if(active !== prevProps.active) {
      this._handleSaveActive()
      if(teams_status === 'success') {
        if(prevProps.active !== null) this._handleFetchSession()
      }
    }
    if(!_.isEqual(user, prevProps.user)) {
      if(user === null) {
        this._handleLeave(prevProps.account, prevProps.team, prevProps.user)
      } else {
        this._handleLoggerLogin(user)
        this._handleRedirectToSaved()
        setTimeout(() => {
          this._handleJoin(account, team, user)
        }, 100)
      }
    }
  }

  _handleChooseTeam(active = 0) {
    if(active === this.props.active) return this._handleRedirectToSaved()
    this.props.onChooseTeam(active)
  }

  _handleForceSignout() {
    const { flash } = this.context
    this._handleSignout()
    flash.set('info', 'Your session has been manually terminated')
  }

  _handleJoin(account, team, user) {
    this.context.network.join([
      `/admin/accounts/${account.id}`,
      `/admin/teams/${team.id}`,
      `/admin/users/${user.id}`
    ])
    this.context.network.subscribe([
      { target: `/admin/accounts/${account.id}`, action: 'account', handler: this._handleFetchAccount },
      { target: `/admin/users/${user.id}`, action: 'session', handler: this._handleFetchSession },
      { target: `/admin/users/${user.id}`, action: 'signout', handler: this._handleForceSignout }
    ])
  }

  _handleLeave(account, team, user) {
    this.context.network.leave([
      `/admin/accounts/${account.id}`,
      `/admin/teams/${team.id}`,
      `/admin/users/${user.id}`
    ])
    this.context.network.unsubscribe([
      { target: `/admin/accounts/${account.id}`, action: 'account', handler: this._handleFetchAccount },
      { target: `/admin/users/${user.id}`, action: 'session', handler: this._handleFetchSession },
      { target: `/admin/users/${user.id}`, action: 'signout', handler: this._handleForceSignout }
    ])
  }

  _handleFetchAccount() {
    const { account } = this.props
    this.props.onFetchAccount(account.token)
  }

  _handleFetchSession() {
    const { active, teams } = this.props
    const id = active || teams[0].id
    const team = _.find(teams, { id }) || teams[0]
    this.props.onFetchSession(id, team.token)
  }

  _handleFetchTeams() {
    const { account } = this.props
    this.props.onFetchTeams(account.token)
  }

  _handleInit() {
    const { pathname } = this.context.router.location
    if(pathname.match(/(activate|signin|reset)/)) return
    this.props.onLoadActive()
  }

  _handleIntent() {
    const { pathname, search, hash } = this.context.router.location
    if(pathname === '/') return
    if(pathname.match(/(activate|signin|reset)/)) return
    this.context.router.history.push('/')
    this.props.onSetRedirect({ pathname, search, hash })
  }

  _handleLoggerLogin(user) {
    this.context.logger.login(user)
  }

  _handleRedirectToSignin() {
    const { flash, router } = this.context
    const { pathname } = router.location
    const { redirect } = this.props
    if(pathname.match(/(activate|reset)/)) return
    if(redirect) flash.set('error', 'You must first signin!')
    router.history.push('/signin')
  }

  _handleRedirectToSaved() {
    const { router } = this.context
    const { pathname, hash, search } = router.location
    const { redirect } = this.props
    this.props.onSetRedirect(null)
    if(_.isEqual(redirect, { pathname, hash, search })) return
    const route = redirect || { pathname: '/' }
    if(route.pathname === pathname) return router.history.replace(route)
    router.history.push(route)
  }

  _handleSaveAccount() {
    const { account } = this.props
    this.props.onSaveAccount(account ? {
      token: account.token
    } : null)
  }

  _handleSaveActive() {
    const { active } = this.props
    this.props.onSaveActive(active)
  }

  _handleSignin(account, active) {
    this.props.onSignin(account, active)
  }

  _handleSignout() {
    this.props.onSignout()
  }

}

export default Admin
