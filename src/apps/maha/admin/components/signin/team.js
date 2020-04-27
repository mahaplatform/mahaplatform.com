import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'maha-admin'

class Team extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    flash: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    signin_id: PropTypes.string,
    status: PropTypes.string,
    teams: PropTypes.array,
    team: PropTypes.object,
    onChangeMode: PropTypes.func,
    onSet: PropTypes.func,
    onTeam: PropTypes.func
  }

  team = null

  state = {
    error: false,
    team: ''
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleShake = this._handleShake.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { status, teams } = this.props
    const { team } = this.state
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-header">
            <div className="maha-avatar">
              <div className="maha-avatar-badge">
                <div className="maha-avatar-wrapper">
                  <Image host={ process.env.WEB_ASSET_CDN_HOST } src="/admin/images/maha.png" title="The Maha Platform" transforms={{ fit: 'cover', w: 150, h: 150 }} />
                </div>
              </div>
            </div>
            <h2>The Maha Platform</h2>
            <p>Sign in To Your Team</p>
          </div>
          <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
            <div className="field team-field">
              <div className="ui fluid left icon input">
                <i className="user icon"></i>
                <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="team" type="text" ref={ (node) => this.team = node } onChange={ e => this._onChange(e) } value={ team }/>
              </div>
            </div>
            <div className="field button-field">
              <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>
                Continue <i className="right chevron icon" />
              </button>
            </div>
          </form>
          <div className="maha-signin-footer">
            { teams.length > 0 &&
              <p><a onClick={ this._handleBack }>Back to Accounts?</a></p>
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(null, null, 'team')
    setTimeout(() => this.team.focus(), 500)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleShake()
      if(status === 'success') this._handleNext()
    }
  }

  _onChange(e) {
    this.setState({ team: e.currentTarget.value.toLowerCase().replace(/\W/g, '') })
  }

  _getFormClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }

  _handleBack() {
    const { onSet } = this.props
    this.team.blur()
    setTimeout(() => onSet(null, null, 'accounts'), 250)
  }

  _handleNext() {
    const { signin_id, team, onChangeMode } = this.props
    this.team.blur()
    if(team.authentication_strategy === 'local') {
      setTimeout(() => onChangeMode('email'), 250)
    } else {
      const state = btoa(JSON.stringify({
        signin_id,
        team_id: team.id
      }))
      this.context.host.signin(`/admin/auth/${team.authentication_strategy}?state=${state}`)
      // setTimeout(() => onChangeMode('wait'), 250)
    }
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSubmit(e) {
    const { onTeam } = this.props
    const subdomain = this.team.value
    onTeam(subdomain)
    e.preventDefault()
  }

}

export default Team
