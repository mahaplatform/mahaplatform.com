import PropTypes from 'prop-types'
import { Loader } from 'reframe'
import React from 'react'
import _ from 'lodash'

class Admin extends React.Component {

  static childContextTypes = {
    admin: PropTypes.object
  }

  static contextTypes = {
    analytics: PropTypes.object,
    flash: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    apps: PropTypes.array,
    children: PropTypes.any,
    rights: PropTypes.array,
    session: PropTypes.object,
    status: PropTypes.string,
    teams: PropTypes.array,
    team: PropTypes.object,
    user: PropTypes.object,
    user_id: PropTypes.number,
    onAddTeam: PropTypes.func,
    onChooseTeam: PropTypes.func,
    onLoadAdmin: PropTypes.func,
    onLoadSession: PropTypes.func,
    onRemoveTeam: PropTypes.func,
    onSaveAdmin: PropTypes.func,
    onSignin: PropTypes.func,
    onSignout: PropTypes.func
  }

  state = {
    redirect: null
  }

  _handleAddTeam = this._handleAddTeam.bind(this)
  _handleChooseTeam = this._handleChooseTeam.bind(this)
  _handleForceSignout = this._handleForceSignout.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleRedirectToSignin = this._handleRedirectToSignin.bind(this)
  _handleReloadSession = this._handleReloadSession.bind(this)
  _handleRemoveTeam = this._handleRemoveTeam.bind(this)
  _handleSaveAdmin = this._handleSaveAdmin.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader />
    return this.props.children
  }

  componentDidMount() {
    this._handleSaveIntent()
    this._handleInitializeAdmin()
  }

  componentDidUpdate(prevProps) {
    const { active, status, teams, team, user, user_id } = this.props
    if(status !== prevProps.status && status === 'loaded' && active === null) {
      this._handleRedirectToSignin()
    }
    if(active !== prevProps.active && active === null) {
      this._handleRedirectToSignin()
    }
    if(active !== prevProps.active && active !== null) {
      this._handleLoadSession()
    }
    if(teams.length !== prevProps.teams.length) {
      this._handleSaveAdmin()
    }
    if(user_id !== prevProps.user_id && prevProps.user_id !== null) {
      this._handleLeave(prevProps.team, prevProps.user)
    }
    if(user_id !== prevProps.user_id && user_id === null) {
      this._handleSaveAdmin()
    }
    if(user_id !== prevProps.user_id && user_id !== null) {
      this._handleJoin(team, user)
      this._handleSaveAdmin()
      this._handleRedirectToSaved()
    }
  }

  getChildContext() {
    const { rights, team, user } = this.props
    return {
      admin: {
        rights,
        team,
        user,
        addTeam: this._handleAddTeam,
        chooseTeam: this._handleChooseTeam,
        removeTeam: this._handleRemoveTeam,
        signin: this._handleSignin,
        signout: this._handleSignout
      }
    }
  }

  _handleAddTeam(team, token, user) {
    this.props.onAddTeam(team, token, user)
  }

  _handleChooseTeam(index) {
    if(index === this.props.active) return this._handleRedirectToSaved()
    this.props.onChooseTeam(index)
  }

  _handleForceSignout() {
    const { flash } = this.context
    this._handleSignout()
    flash.set('info', 'Your session has been manually terminated')
  }

  _handleJoin(team, user) {
    const { network } = this.context
    network.join([
      `/admin/teams/${team.id}`,
      `/admin/users/${user.id}`,
      `/admin/sessions/${user.session_id}`
    ])
    network.subscribe([
      { action: 'session', handler: this._handleReloadSession },
      { action: 'signout', handler: this._handleForceSignout }
    ])
  }

  _handleLeave(team, user) {
    const { network } = this.context
    network.leave([
      `/admin/teams/${team.id}`,
      `/admin/users/${user.id}`,
      `/admin/sessions/${user.session_id}`
    ])
    network.unsubscribe([
      { action: 'session', handler: this._handleReloadSession },
      { action: 'signout', handler: this._handleForceSignout }
    ])
  }

  _handleLoadSession() {
    this.props.onLoadSession()
  }

  _handleRedirectToSignin() {
    const { flash, router } = this.context
    if(this.state.redirect) flash.set('error', 'You must first signin!')
    router.push('/admin/signin')
  }

  _handleRedirectToSaved() {
    const { router } = this.context
    const { pathname, hash, search } = router
    const { redirect } = this.state
    this.setState({ redirect: null })
    if(_.isEqual(redirect, { pathname, hash, search })) return
    const route = redirect || { pathname: '/admin' }
    if(route.pathname === pathname) return router.replace(route)
    router.push(route)
  }

  _handleReloadSession() {
    const { team, onLoadSession } = this.props
    onLoadSession(team.token)
  }

  _handleRemoveTeam(index) {
    this.props.onRemoveTeam(index)
  }

  _handleSaveAdmin() {
    const { active, teams, onSaveAdmin } = this.props
    onSaveAdmin(active, teams)
  }

  _handleSaveIntent() {
    const { pathname, search, hash } = this.context.router
    if(pathname === '/admin') return
    this.context.router.push('/admin')
    if(pathname.match(/(activate|signin|reset)/)) return
    const redirect = { pathname, search, hash }
    this.setState({ redirect })
  }

  _handleInitializeAdmin() {
    const { pathname } = this.context.router
    if(!pathname.match(/(activate|reset)/)) this.props.onLoadAdmin()
    this.context.router.push(pathname)
  }

  _handleSignin(team, token, user) {
    const { teams } = this.props
    const index = _.findIndex(teams, { id: team.id, user: { id: user.id } })
    if(index < 0) return this.props.onAddTeam(team, token, user)
    this.props.onSignin(index, token)
  }

  _handleSignout() {
    const { active, onSignout } = this.props
    onSignout(active)
  }

}

export default Admin
