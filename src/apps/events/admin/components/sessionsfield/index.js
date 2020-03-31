import SessionToken from '../../tokens/session'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'
import _ from 'lodash'

class SessionsField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    sessions: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { sessions } = this.state
    return (
      <div className="sessionsfield">
        <div className="sessionsfield-sessions">
          { sessions.map((session, index) => (
            <div className="sessionsfield-session" key={`session_${index}`}>
              <div className="sessionsfield-session-token">
                <SessionToken { ...session } />
              </div>
              <div className="sessionsfield-session-action">
                <i className="fa fa-pencil" />
              </div>
              <div className="sessionsfield-session-action" onClick={ this._handleRemove.bind(this, index )}>
                <i className="fa fa-times" />
              </div>
            </div>
          )) }
        </div>
        <div className="sessionsfield-add">
          <Button { ...this._getAddButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        sessions: defaultValue
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { sessions } = this.state
    if(!_.isEqual(sessions, prevState.sessions)) {
      this._handleChange()
    }
  }

  _handleChange() {
    const { sessions } = this.state
    const value = sessions.map(session => ({
      title: session.title,
      location_id: session.location ? session.location.id : null,
      is_online: session.is_online,
      date: session.date,
      start_time: session.start_time,
      end_time: session.end_time
    }))
    this.props.onChange(value)
  }

  _getAddButton() {
    return {
      label: 'Add a session',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getNew() {
    return {
      onBack: this._handleBack,
      onDone: this._handleAdd
    }
  }

  _handleAdd(session) {
    this.setState({
      sessions: [
        ...this.state.sessions,
        session
      ]
    })
    this.context.form.pop()
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

  _handleRemove(index) {
    this.setState({
      sessions: [
        ...this.state.sessions.filter((session, i) => {
          return i !== index
        })
      ]
    })
  }

}


export default SessionsField
